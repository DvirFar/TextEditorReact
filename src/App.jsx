import { useState } from 'react'
import TextArea from './components/TextArea'
import EditArea from './components/EditArea'
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
