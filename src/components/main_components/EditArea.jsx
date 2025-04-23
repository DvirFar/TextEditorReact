import StyleArea from "../edit_components/StyleArea";
import KeyboardArea from "../edit_components/KeyboardArea";
import SpecialEditsArea from "../edit_components/SpecialEditsArea";
import UndoArea from "../edit_components/UndoArea";
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