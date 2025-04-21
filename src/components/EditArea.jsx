import Keyboard from "./Keyboard";
import { useState } from "react";

function EditArea(props) {
    const [keyboard, setKeyboard] = useState('EnglishSml')

    const handleKeyBoardChange = (keyboard) => {
        setKeyboard(keyboard);
    }

    return <>
        <Keyboard type={keyboard} onKeyEvent={(val) => props.onKeyEvent(val)} />
        <div className="keyboard-type">
            <button onClick={() => handleKeyBoardChange("EnglishCap")}>English - Capital</button>
            <button onClick={() => handleKeyBoardChange("EnglishSml")}>English - Small</button>
            <button onClick={() => handleKeyBoardChange("Hebrew")}>Hebrew</button>
            <button onClick={() => handleKeyBoardChange("Digits")}>Digits</button>
            <button onClick={() => handleKeyBoardChange("SpecialChars")}>Special Characters</button>
        </div>
    </>
}

export default EditArea;