import { useState } from "react";
import Keyboard from "../edit_components/Keyboard";

function KeyboardArea(props) {
    const [keyboard, setKeyboard] = useState('EnglishSml')

    const handleKeyBoardChange = (keyboard) => {
        setKeyboard(keyboard);
    }

    return (
        <div className="keyboard-area">
            <Keyboard type={keyboard} onKeyEvent={(val) => props.onKeyEvent(val)} />
            <div className="keyboard-type">
                <button onClick={() => handleKeyBoardChange("EnglishCap")}>English - Capital</button>
                <button onClick={() => handleKeyBoardChange("EnglishSml")}>English - Small</button>
                <button onClick={() => handleKeyBoardChange("Hebrew")}>Hebrew</button>
                <button onClick={() => handleKeyBoardChange("Digits")}>Digits</button>
                <button onClick={() => handleKeyBoardChange("SpecialChars")}>Special Characters</button>
                <button onClick={() => handleKeyBoardChange("Emojis")}>Emojis</button>
            </div>
        </div>
    );
}

export default KeyboardArea;