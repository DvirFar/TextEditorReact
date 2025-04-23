import { useState } from 'react'
import TextArea from './components/main_components/TextArea'
import EditArea from './components/main_components/EditArea'
import './App.css'

function App() {
  const [text, setText] = useState('')

  return (
    <>
      <TextArea text={text} />
      <EditArea text={text} setText={(val) => setText(val)} />
    </>
  )
}

export default App
