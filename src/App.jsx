import { useState } from 'react'
import TextArea from './components/main_components/TextArea'
import EditArea from './components/main_components/EditArea'
import { TextFormatterProvider } from './components/main_components/TextFormatter'
import './App.css'

function App() {
  const [text, setText] = useState('')

  const handleTextChange = (val) => {
    setText(prevText => prevText + val);
  }

  return (
    <TextFormatterProvider>
      <div className="app-container">
        <TextArea text={text} />
        <EditArea 
          text={text} 
          setText={setText} 
          onKeyEvent={handleTextChange}
        />
      </div>
    </TextFormatterProvider>
  )
}

export default App