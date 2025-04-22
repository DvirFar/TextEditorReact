import StyleArea from "./StyleArea";
import KeyboardArea from "./KeyboardArea";
import SpecialEditsArea from "./SpecialEditsArea";

function EditArea(props) {

    return <div className="edit-area" style={{"display":"flex", "flexDirection":"row"}}>
        <StyleArea />
        <KeyboardArea onKeyEvent={(val) => props.setText(props.text + val)} />
        <SpecialEditsArea text={props.text} setText={(newText) => props.setText(newText)} />
    </div>
}

export default EditArea;