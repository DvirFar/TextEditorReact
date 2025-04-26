import { useState } from 'react'
import SaveArea from './components/main_components/SaveArea'
import TextArea from './components/main_components/TextArea'
import EditArea from './components/main_components/EditArea'
import MultiTextAreaManager from './components/main_components/MultiTextAreaManager'
import { syncSingleAndMultiState, handleToggleFormat, handleKeyPress, handleUpdateText, 
        handleUndo, handleAddTextArea, handleRemoveTextArea, handleSwitchTextArea } from './utils/mainFuncs'
import { saveFileAs, openFile } from './utils/save'
import './App.css'

function App() {
  // Initial single text area state (preserving existing functionality)
  const [text, setText] = useState('')
  const [_, setHistory] = useState([])
  const [formatting, setFormatting] = useState({
    bold: false,
    italic: false,
    underline: false,
    fontSize: 'medium',
    fontFamily: 'default',
    color: 'black',
    alignment: 'left'
  });
  
  // New states for multi-text functionality
  const [texts, setTexts] = useState([text])
  const [histories, setHistories] = useState([[]])
  const [activeIndex, setActiveIndex] = useState(0)
  const [formattings, setFormattings] = useState([formatting])

  const toggleFormat = (formatType) => {
    handleToggleFormat(formatType, setFormatting, formattings, setFormattings, activeIndex);
  }
  
  const keyPress = (val) => {
    handleKeyPress(val, text, setText, setHistory, texts, setTexts, histories, setHistories, activeIndex);
  }
  
  const updateText = (newText) => {
    handleUpdateText(newText, text, setText, setHistory, texts, setTexts, histories, setHistories, activeIndex);
  }

  const undo = () => {
    handleUndo(setText, setHistory, texts, setTexts, histories, setHistories, activeIndex);
  }

  const addTextArea = () => {
    handleAddTextArea(texts, histories, formattings,
      setText, setTexts, setHistory, setHistories, setFormatting, setFormattings, activeIndex, setActiveIndex
    );
  }
  
  const removeTextArea = (index) => {
    handleRemoveTextArea(index, texts, histories, formattings, activeIndex,
     setText, setTexts, setHistory, setHistories, setFormatting, setFormattings, setActiveIndex
    );
  }
  
  const switchTextArea = (index) => {
    handleSwitchTextArea(index, setText, setHistory, texts, histories, formattings, setFormatting, activeIndex, setActiveIndex);
  }
  
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
          onTextChange={(index) => switchTextArea(index)}
        />
      )}
      
      <EditArea 
        text={text} 
        setText={updateText} 
        onKeyEvent={keyPress}
        formatting={formatting}
        toggleFormat={toggleFormat}
        onUndo={undo}
      />
    </div>
  )
}

export default App