
// Function to keep the original text state in sync with multi-text state
const syncSingleAndMultiState = (newTexts, newHistories, newFormattings, newActiveIndex,
    setText, setTexts, setHistory, setHistories, setFormatting, setFormattings, activeIndex, setActiveIndex
) => {
  if (newTexts) {
    setTexts(newTexts);
    setText(newTexts[newActiveIndex !== undefined ? newActiveIndex : activeIndex]);
  }
  
  if (newHistories) {
    setHistories(newHistories);
    setHistory(newHistories[newActiveIndex !== undefined ? newActiveIndex : activeIndex]);
  }
  
  if (newFormattings) {
    setFormattings(newFormattings);
    setFormatting(newFormattings[newActiveIndex !== undefined ? newActiveIndex : activeIndex]);
  }
  
  if (newActiveIndex !== undefined) {
    setActiveIndex(newActiveIndex);
  }
};

// Function to toggle formatting options - extends existing function
const toggleFormat = (formatType, setFormatting, formattings, setFormattings, activeIndex) => {
  if (['bold', 'italic', 'underline'].includes(formatType)) {
    // Update the original formatting state
    setFormatting(prevState => ({
      ...prevState,
      [formatType]: !prevState[formatType]
    }));
    
    // Update the formatting for the active text area
    const newFormattings = [...formattings];
    newFormattings[activeIndex] = {
      ...newFormattings[activeIndex],
      [formatType]: !newFormattings[activeIndex][formatType]
    };
    setFormattings(newFormattings);
  } 
  else if (['small', 'medium', 'large'].includes(formatType)) {
    setFormatting(prev => ({
      ...prev,
      fontSize: formatType
    }));
    
    const newFormattings = [...formattings];
    newFormattings[activeIndex] = {
      ...newFormattings[activeIndex],
      fontSize: formatType
    };
    setFormattings(newFormattings);
  } 
  else if (['default', 'serif', 'sans-serif', 'monospace', 'cursive'].includes(formatType)) {
    setFormatting(prev => ({
      ...prev,
      fontFamily: formatType
    }));
    
    const newFormattings = [...formattings];
    newFormattings[activeIndex] = {
      ...newFormattings[activeIndex],
      fontFamily: formatType
    };
    setFormattings(newFormattings);
  } 
  else if (['black', 'red', 'blue', 'green'].includes(formatType)) {
    setFormatting(prev => ({
      ...prev,
      color: formatType
    }));
    
    const newFormattings = [...formattings];
    newFormattings[activeIndex] = {
      ...newFormattings[activeIndex],
      color: formatType
    };
    setFormattings(newFormattings);
  } 
  else if (['left', 'center', 'right'].includes(formatType)) {
    setFormatting(prev => ({
      ...prev,
      alignment: formatType
    }));
    
    const newFormattings = [...formattings];
    newFormattings[activeIndex] = {
      ...newFormattings[activeIndex],
      alignment: formatType
    };
    setFormattings(newFormattings);
  }
};

const handleKeyPress = (val, text, setText, setHistory, texts, setTexts, histories, setHistories, activeIndex) => {
  // Update original state for backward compatibility
  setHistory(prev => [...prev, text]);
  setText(prevText => prevText + val);
  
  // Update the multi-text state
  const newTexts = [...texts];
  const newHistories = [...histories];
  
  // Save the current text in history
  newHistories[activeIndex] = [...histories[activeIndex], texts[activeIndex]];
  // Update the text
  newTexts[activeIndex] = texts[activeIndex] + val;
  
  setTexts(newTexts);
  setHistories(newHistories);
}

const updateText = (newText, text, setText, setHistory, texts, setTexts, histories, setHistories, activeIndex) => {
  // Update original state for backward compatibility
  setHistory(prev => [...prev, text]);
  setText(newText);
  
  // Update the multi-text state
  const newTexts = [...texts];
  const newHistories = [...histories];
  
  // Save the current text in history
  newHistories[activeIndex] = [...histories[activeIndex], texts[activeIndex]];
  // Update the text
  newTexts[activeIndex] = newText;
  
  setTexts(newTexts);
  setHistories(newHistories);
};

const undo = (setText, setHistory, texts, setTexts, histories, setHistories, activeIndex) => {
  if (history.length > 0) {
    const previousText = history[history.length - 1];
    setHistory(prev => prev.slice(0, -1));
    setText(previousText);
  }
  
  // Multi-text undo
  if (histories[activeIndex] && histories[activeIndex].length > 0) {
    const previousText = histories[activeIndex][histories[activeIndex].length - 1];
    
    const newTexts = [...texts];
    const newHistories = [...histories];
    
    newTexts[activeIndex] = previousText;
    newHistories[activeIndex] = newHistories[activeIndex].slice(0, -1);
    
    setTexts(newTexts);
    setHistories(newHistories);
  }
};

// Functions for multi-text management
const addTextArea = (texts, histories, formattings,
    setText, setTexts, setHistory, setHistories, setFormatting, setFormattings, activeIndex, setActiveIndex
) => {
  // Add a new text area with default settings
  const newTexts = [...texts, ''];
  const newHistories = [...histories, []];
  const newFormattings = [...formattings, {
    bold: false,
    italic: false,
    underline: false,
    fontSize: 'medium',
    fontFamily: 'default',
    color: 'black',
    alignment: 'left'
  }];
  
  syncSingleAndMultiState(newTexts, newHistories, newFormattings, texts.length,
    setText, setTexts, setHistory, setHistories, setFormatting, setFormattings, activeIndex, setActiveIndex
  );
};

const removeTextArea = (index, texts, histories, formattings, activeIndex,
    setText, setTexts, setHistory, setHistories, setFormatting, setFormattings, setActiveIndex
) => {
  if (texts.length <= 1) return; // Don't remove the last text area
  
  const newTexts = texts.filter((_, i) => i !== index);
  const newHistories = histories.filter((_, i) => i !== index);
  const newFormattings = formattings.filter((_, i) => i !== index);
  
  // Adjust active index if necessary
  let newActiveIndex = activeIndex;
  if (index === activeIndex) {
    newActiveIndex = Math.max(0, activeIndex - 1);
  } else if (index < activeIndex) {
    newActiveIndex = activeIndex - 1;
  }
  
  syncSingleAndMultiState(newTexts, newHistories, newFormattings, newActiveIndex,
    setText, setTexts, setHistory, setHistories, setFormatting, setFormattings, activeIndex, setActiveIndex
  );
};

const switchTextArea = (index, setText, setHistory, texts, histories, formattings, setFormatting, activeIndex, setActiveIndex) => {
  if (index === activeIndex || index >= texts.length) return;
  
  setActiveIndex(index);
  setText(texts[index]);
  setHistory(histories[index]);
  setFormatting(formattings[index]);
};


export { syncSingleAndMultiState, toggleFormat as handleToggleFormat, handleKeyPress, updateText as handleUpdateText,
     undo as handleUndo, addTextArea as handleAddTextArea, removeTextArea as handleRemoveTextArea, switchTextArea as handleSwitchTextArea }
