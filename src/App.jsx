import { useState } from 'react'
import TextArea from './components/TextArea'
import EditArea from './components/EditArea'
import { TextFormatterProvider } from './components/TextFormatter'
import './App.css'

function App() {
  const [text, setText] = useState('')
  const [formattedSegments, setFormattedSegments] = useState([])

  function handleClick(value) {
    setText(text + value);
  }

  return (
    <TextFormatterProvider>
      <TextArea text={text} formattedSegments={formattedSegments} />
      <EditArea 
        onKeyEvent={(val) => handleClick(val)} 
        onStyleApply={(style) => {
          // This function would be implemented to apply styles to selected text
          // For now it's a placeholder as the existing functionality focuses on adding text
          console.log("Style applied:", style);
        }} 
      />
    </TextFormatterProvider>
  )
}

export default App