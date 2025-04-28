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
const toggleFormat = (formatType, text, texts, setHistory, histories, setHistories, setFormatting, formattings, setFormattings, activeIndex) => {
  

  let newFormattings;
  if (['bold', 'italic', 'underline'].includes(formatType)) {
    // Update the original formatting state
    setFormatting(prevState => ({
      ...prevState,
      [formatType]: !prevState[formatType]
    }));
    
    // Update the formatting for the active text area
    newFormattings = [...formattings];
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
    
    newFormattings = [...formattings];
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
    
    newFormattings = [...formattings];
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
    
    newFormattings = [...formattings];
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
    
    newFormattings = [...formattings];
    newFormattings[activeIndex] = {
      ...newFormattings[activeIndex],
      alignment: formatType
    };
    setFormattings(newFormattings);
  }

  setHistory((prev) => [...prev, { text, formatting: newFormattings[activeIndex] }]);
  console.log("added style:", { text, formatting: newFormattings[activeIndex] });

  const newHistories = [...histories];
  newHistories[activeIndex] = [...histories[activeIndex], { text: texts[activeIndex], formatting: newFormattings[activeIndex] }];
  setHistories(newHistories);
};

const handleKeyPress = (val, text, formatting, setText, setHistory, texts, setTexts, formattings, histories, setHistories, activeIndex) => {
  // Save the current state in the history
  setHistory((prev) => [...prev, { text: text + val, formatting: formatting }]);
  console.log("added key:", { text: text + val, formatting: formatting });
  

  // Update the text
  setText((prevText) => prevText + val);

  // Update the multi-text state
  const newTexts = [...texts];
  const newHistories = [...histories];

  newHistories[activeIndex] = [...histories[activeIndex], { text: texts[activeIndex] + val, formatting: formattings[activeIndex] }];
  newTexts[activeIndex] = texts[activeIndex] + val;

  setTexts(newTexts);
  setHistories(newHistories);
  //console.log(newHistories);
  
}

const updateText = (newText, text, formatting, setText, setHistory, texts, setTexts, formattings, histories, setHistories, activeIndex) => {
  // Save the current state (text and formatting) in the history
  setHistory(prev => [...prev, { text, formatting }]);
  
  // Update the original text state
  setText(newText);
  
  // Update the multi-text state
  const newTexts = [...texts];
  const newHistories = [...histories];
  
  // Save the current text and formatting in the history for the active text area
  newHistories[activeIndex] = [...histories[activeIndex], { text: newText, formatting: formattings[activeIndex] }];
  
  // Update the text for the active text area
  newTexts[activeIndex] = newText;
  
  setTexts(newTexts);
  setHistories(newHistories);
};

const undo = (setText, setFormatting, setHistory, texts, setTexts, formattings, setFormattings, histories, setHistories, activeIndex) => {
  // Undo for single text area
  setHistory((prevHistory) => {
    if (prevHistory.length > 1) {
      const lastState = prevHistory[prevHistory.length - 2];
      console.log("removing", lastState);
      
      setText(lastState.text);
      setFormatting(lastState.formatting);
      return prevHistory.slice(0, -1);
    }
    return [];
  });

  // Undo for multi-text areas
  if (histories[activeIndex]?.length > 1) {
    const lastState = histories[activeIndex][histories[activeIndex].length - 2];

    const newTexts = [...texts];
    const newFormattings = [...formattings];
    const newHistories = [...histories];

    newTexts[activeIndex] = lastState.text;
    newFormattings[activeIndex] = lastState.formatting;
    newHistories[activeIndex] = newHistories[activeIndex].slice(0, -1);

    setTexts(newTexts);
    setFormattings(newFormattings);
    setHistories(newHistories);
  } 
  else if (histories[activeIndex]?.length === 1) {
    const newTexts = [...texts];
    const newFormattings = [...formattings];
    const newHistories = [...histories];

    newTexts[activeIndex] = '';
    newFormattings[activeIndex] = {
      bold: false,
      italic: false,
      underline: false,
      fontSize: 'medium',
      fontFamily: 'default',
      color: 'black',
      alignment: 'left'
    };
    newHistories[activeIndex] = [];

    setTexts(newTexts);
    setFormattings(newFormattings);
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
