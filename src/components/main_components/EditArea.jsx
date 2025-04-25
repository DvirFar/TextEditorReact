import StyleArea from "../edit_components/StyleArea";
import KeyboardArea from "../edit_components/KeyboardArea";
import SpecialEditsArea from "../edit_components/SpecialEditsArea";
import UndoArea from "../edit_components/UndoArea";

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