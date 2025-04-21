import { useState } from 'react'
import TextArea from './components/TextArea'
import EditArea from './components/EditArea'
import './App.css'

function App() {
  const [text, setText] = useState('')

  function handleClick(value) {
    setText(text + value);
  }

  return (
    <>
      <TextArea text={text} />
      <EditArea onKeyEvent={(val) => handleClick(val)} />
    </>
  )
}

export default App
