import StyleArea from "./StyleArea";
import KeyboardArea from "./KeyboardArea";
import SpecialEditsArea from "./SpecialEditsArea";

function EditArea(props) {

    return <>
        <StyleArea />
        <KeyboardArea onKeyEvent={(val) => props.onKeyEvent(val)} />
        <SpecialEditsArea />
    </>
}

export default EditArea;