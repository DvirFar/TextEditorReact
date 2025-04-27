import { useState } from 'react'
import SaveArea from './SaveArea'
import TextArea from './TextArea'
import EditArea from './EditArea'
import MultiTextAreaManager from './MultiTextAreaManager'
import LogoutButton from '../auth/LogoutButton'
import { syncSingleAndMultiState, handleToggleFormat, handleKeyPress, handleUpdateText, 
        handleUndo, handleAddTextArea, handleRemoveTextArea, handleSwitchTextArea } from '../../utils/mainFuncs'
import { saveFileAs, openFile } from '../../utils/save'
import '../../styles/App.css'

function App({ username, onLogout }) {
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
    const userName = sessionStorage.getItem('CurrentUser');
    
    // For compatibility with existing code, save the active text
    saveFileAs(userName, fileName, text);
    
    // Also save the multi-text state
    const multiTextState = {
      texts,
      formattings
    };
    saveFileAs(userName, `${fileName}_multi`, JSON.stringify(multiTextState));
    
    sessionStorage.setItem('CurrentFileName', fileName);
  }

  const handleOpen = (fileName) => {
    console.log("Opening", fileName);
    const userName = sessionStorage.getItem('CurrentUser');
    
    // Try to open as multi-text first
    const multiTextState = openFile(userName, `${fileName}_multi`);
    
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
        const fileText = openFile(userName, fileName);
        if (fileText) setText(fileText);
        else alert("File not found");
      }
    } else {
      // Open as single text
      const fileText = openFile(userName, fileName);
      if (fileText) {
        setText(fileText);
        
        // Update multi-text state
        const newTexts = [fileText];
        const newHistories = [[]];
        const newFormattings = [{ ...formatting }];
        
        syncSingleAndMultiState(newTexts, newHistories, newFormattings, 0,
          setText, setTexts, setHistory, setHistories, setFormatting, setFormattings, activeIndex, setActiveIndex
        );
      }
      else alert("File not found");
    }
  }

  return (
    <div className="app-container">
      <LogoutButton username={username} onLogout={onLogout} />
      
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