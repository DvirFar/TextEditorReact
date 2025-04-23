import StyleArea from "./StyleArea";
import KeyboardArea from "./KeyboardArea";
import SpecialEditsArea from "./SpecialEditsArea";
import UndoArea from "./UndoArea";
import { useState } from "react";

function EditArea(props) {
    const [history, setHistory] = useState([]);

    const updateText = (newText) => {
        setHistory((prevHistory) => [...prevHistory, props.text]); // Save current state to history
        props.setText(newText);
    };

    const undo = () => {
        if (history.length > 0) {
            const lastState = history[history.length - 1];
            setHistory((prevHistory) => prevHistory.slice(0, -1)); // Remove the last state
            props.setText(lastState);
        }
    };

    return <div className="edit-area" style={{"display":"flex", "flexDirection":"row"}}>
        <StyleArea />
        <KeyboardArea onKeyEvent={(val) => updateText(props.text + val)} />
        <SpecialEditsArea text={props.text} setText={(newText) => updateText(newText)} />
        <UndoArea onUndo={undo} />
    </div>
}

export default EditArea;