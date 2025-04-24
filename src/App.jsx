import { useState } from 'react'
<<<<<<< HEAD
import TextArea from './components/TextArea'
import EditArea from './components/EditArea'
import { TextFormatterProvider } from './components/TextFormatter'
=======
import TextArea from './components/main_components/TextArea'
import EditArea from './components/main_components/EditArea'
>>>>>>> ca05ae0b9b96d1d88296e18ae3044fc223fd65a3
import './App.css'

function App() {
  const [text, setText] = useState('')
  const [formattedSegments, setFormattedSegments] = useState([])

  return (
<<<<<<< HEAD
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
=======
    <>
      <TextArea text={text} />
      <EditArea text={text} setText={(val) => setText(val)} />
    </>
>>>>>>> ca05ae0b9b96d1d88296e18ae3044fc223fd65a3
  )
}

export default App