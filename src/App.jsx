import { useState } from 'react'
import TextArea from './components/main_components/TextArea'
import EditArea from './components/main_components/EditArea'
import './App.css'

function App() {
  const [text, setText] = useState('')
  const [history, setHistory] = useState([])
  
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

  // Function to toggle formatting options
  const toggleFormat = (formatType) => {
    if (['bold', 'italic', 'underline'].includes(formatType)) {
      setFormatting(prevState => ({
        ...prevState,
        [formatType]: !prevState[formatType]
      }));
    } 
    else if (['small', 'medium', 'large'].includes(formatType)) {
      setFormatting(prev => ({
        ...prev,
        fontSize: formatType
      }));
    } 
    else if (['default', 'serif', 'sans-serif', 'monospace', 'cursive'].includes(formatType)) {
      setFormatting(prev => ({
        ...prev,
        fontFamily: formatType
      }));
    } 
    else if (['black', 'red', 'blue', 'green'].includes(formatType)) {
      setFormatting(prev => ({
        ...prev,
        color: formatType
      }));
    } 
    else if (['left', 'center', 'right'].includes(formatType)) {
      setFormatting(prev => ({
        ...prev,
        alignment: formatType
      }));
    }
  };

  const handleTextChange = (val) => {
    setHistory(prev => [...prev, text]); // Save current text to history before changing
    setText(prevText => prevText + val);
  }
  
  const updateText = (newText) => {
    setHistory(prev => [...prev, text]); // Save current text to history
    setText(newText);
  };
  
  const undo = () => {
    if (history.length > 0) {
      const previousText = history[history.length - 1];
      setHistory(prev => prev.slice(0, -1)); // Remove last item from history
      setText(previousText);
    }
  };

  return (
    <div className="app-container">
      <TextArea text={text} formatting={formatting} />
      <EditArea 
        text={text} 
        setText={updateText} 
        onKeyEvent={handleTextChange}
        formatting={formatting}
        toggleFormat={toggleFormat}
        onUndo={undo}
      />
    </div>
  )
}

export default App