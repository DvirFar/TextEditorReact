import { useState } from 'react'
import TextArea from './components/main_components/TextArea'
import EditArea from './components/main_components/EditArea'
import { TextFormatterProvider } from './components/TextFormatter'
import './App.css'

function App() {
  const [text, setText] = useState('')
  const [formattedSegments, setFormattedSegments] = useState([])

  const handleTextChange = (val) => {
    setText(text + val);
  }

  return (
    <TextFormatterProvider>
      <div className="app-container">
        <TextArea text={text} formattedSegments={formattedSegments} />
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