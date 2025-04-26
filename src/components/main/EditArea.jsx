import StyleArea from '../edit/Style/StyleArea'
import KeyboardArea from "../edit/Keyboard/KeyboardArea";
import SpecialEditsArea from "../edit/SpecialEdits/SpecialEditsArea";
import UndoArea from "../edit/Undo/UndoArea";

function EditArea(props) {
    const handleStyleChange = (styleType) => {
        props.toggleFormat(styleType);
        console.log("Style changed:", styleType);
    };

    return (
        <div className="edit-area" style={{"display":"flex", "flexDirection":"column"}}>
            <StyleArea 
                onStyleChange={handleStyleChange} 
                formatting={props.formatting}
            />
            <div style={{"display":"flex", "flexDirection":"row"}}>
                <SpecialEditsArea text={props.text} setText={props.setText} />
                <KeyboardArea onKeyEvent={(val) => props.onKeyEvent(val)} />
                <UndoArea onUndo={props.onUndo} />
            </div>
        </div>
    );
}

export default EditArea;