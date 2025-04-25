import { useState } from 'react'
import SaveArea from './components/main_components/SaveArea'
import TextArea from './components/main_components/TextArea'
import EditArea from './components/main_components/EditArea'
import MultiTextAreaManager from './components/main_components/MultiTextAreaManager'
import { saveFileAs, openFile } from './utils/save'
import './App.css'

function App() {
  // Initial single text area state (preserving existing functionality)
  const [text, setText] = useState('')
  const [history, setHistory] = useState([])
  
  // New states for multi-text functionality
  const [texts, setTexts] = useState([text])
  const [histories, setHistories] = useState([[]])
  const [activeIndex, setActiveIndex] = useState(0)
  const [formattings, setFormattings] = useState([{
    bold: false,
    italic: false,
    underline: false,
    fontSize: 'medium',
    fontFamily: 'default',
    color: 'black',
    alignment: 'left'
  }])

  // Function to keep the original text state in sync with multi-text state
  const syncSingleAndMultiState = (newTexts, newHistories, newFormattings, newActiveIndex) => {
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

  // New state for text formatting
  const [formatting, setFormatting] = useState({
    bold: false,
    italic: false,
    underline: false,
    fontSize: 'medium',
    fontFamily: 'default',
    color: 'black',
    alignment: 'left'
  });

  // Function to toggle formatting options - extends existing function
  const toggleFormat = (formatType) => {
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

  const handleKeyPress = (val) => {
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
  
  const updateText = (newText) => {
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
  
  const undo = () => {
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
  const addTextArea = () => {
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
    
    syncSingleAndMultiState(newTexts, newHistories, newFormattings, texts.length);
  };

  const removeTextArea = (index) => {
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
    
    syncSingleAndMultiState(newTexts, newHistories, newFormattings, newActiveIndex);
  };

  const switchTextArea = (index) => {
    if (index === activeIndex || index >= texts.length) return;
    
    setActiveIndex(index);
    setText(texts[index]);
    setHistory(histories[index]);
    setFormatting(formattings[index]);
  };

  const handleSave = (fileName) => {
    console.log("Saving...");
    
    // For compatibility with existing code, save the active text
    saveFileAs(fileName, text);
    
    // Also save the multi-text state
    const multiTextState = {
      texts,
      formattings
    };
    saveFileAs(`${fileName}_multi`, JSON.stringify(multiTextState));
    
    sessionStorage.setItem('CurrentFileName', fileName);
  }

  const handleOpen = (fileName) => {
    console.log("Opening", fileName);
    
    // Try to open as multi-text first
    const multiTextState = openFile(`${fileName}_multi`);
    
    if (multiTextState) {
      try {
        const parsedState = JSON.parse(multiTextState);
        setTexts(parsedState.texts);
        setFormattings(parsedState.formattings);
        setHistories(parsedState.texts.map(() => []));
        setActiveIndex(0);
        setText(parsedState.texts[0]);
        setFormatting(parsedState.formattings[0]);
        setHistory([]);
      } catch (e) {
        console.error("Error parsing multi-text state:", e);
        // Fallback to single text file
        const fileText = openFile(fileName);
        if (fileText) setText(fileText);
        else alert("File not found");
      }
    } else {
      // Open as single text
      const fileText = openFile(fileName);
      if (fileText) {
        setText(fileText);
        
        // Update multi-text state
        const newTexts = [fileText];
        const newHistories = [[]];
        const newFormattings = [{ ...formatting }];
        
        syncSingleAndMultiState(newTexts, newHistories, newFormattings, 0);
      }
      else alert("File not found");
    }
  }

  return (
    <div className="app-container">
      <SaveArea 
        onSave={(fileName) => handleSave(fileName)} 
        onOpen={(fileName) => handleOpen(fileName)} 
      />
      
      {/* Multi-text management controls */}
      <div className="text-area-controls">
        <button onClick={addTextArea}>Add Text Area</button>
        {texts.length > 1 && 
          <button onClick={() => removeTextArea(activeIndex)}>Remove Active Text Area</button>
        }
      </div>
      
      {/* Use either the original TextArea or the new MultiTextAreaManager */}
      {texts.length <= 1 ? (
        <TextArea text={text} formatting={formatting} />
      ) : (
        <MultiTextAreaManager 
          texts={texts}
          formattings={formattings}
          activeIndex={activeIndex}
          onTextChange={switchTextArea}
        />
      )}
      
      <EditArea 
        text={text} 
        setText={updateText} 
        onKeyEvent={handleKeyPress}
        formatting={formatting}
        toggleFormat={toggleFormat}
        onUndo={undo}
      />
    </div>
  )
}

export default App