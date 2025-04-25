import StyleArea from "../edit_components/StyleArea";
import KeyboardArea from "../edit_components/KeyboardArea";
import SpecialEditsArea from "../edit_components/SpecialEditsArea";
import UndoArea from "../edit_components/UndoArea";
import { useState } from "react";
import { useFormatting } from "./TextFormatter";

function EditArea(props) {
    const [history, setHistory] = useState([]);
    const { toggleFormat } = useFormatting();

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

    const handleStyleChange = (styleType) => {
        toggleFormat(styleType);
        console.log("Style changed:", styleType);
    };

    return (
        <div className="edit-area" style={{"display":"flex", "flexDirection":"column"}}>
            <StyleArea onStyleChange={handleStyleChange} />
            <div style={{"display":"flex", "flexDirection":"row"}}>
                <SpecialEditsArea text={props.text} setText={(newText) => updateText(newText)} />
                <KeyboardArea onKeyEvent={(val) => props.onKeyEvent(val)} />
                <UndoArea onUndo={undo} />
            </div>
        </div>
    );
}

export default EditArea;