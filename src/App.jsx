import { useState } from 'react'
import SaveArea from './components/main_components/SaveArea'
import TextArea from './components/main_components/TextArea'
import EditArea from './components/main_components/EditArea'
import { TextFormatterProvider } from './components/main_components/TextFormatter'
import { saveFileAs, openFile } from './utils/save'
import './App.css'

function App() {
  const [text, setText] = useState('')

  const handleKeyPress = (val) => {
    setText(prevText => prevText + val);
  }

  const handleSave = (fileName) => {
    console.log("Saving...");
    saveFileAs(fileName, text);
    sessionStorage.setItem('CurrentFileName', fileName);
  }

  const handleOpen = (fileName) => {
    console.log("Opening", fileName);
    const fileText = openFile(fileName);
    if (fileText) setText(fileText);
    else alert("File not found");    
  }

  return (
    <TextFormatterProvider>
      <div className="app-container">
        <SaveArea 
          onSave={(fileName) => handleSave(fileName)} 
          onOpen={(fileName) => handleOpen(fileName)} 
        />
        <TextArea text={text} />
        <EditArea 
          text={text} 
          setText={setText} 
          onKeyEvent={handleKeyPress}
        />
      </div>
    </TextFormatterProvider>
  )
}

export default App