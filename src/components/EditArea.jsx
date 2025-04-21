import Keyboard from "./Keyboard";

function EditArea(props) {
    return <Keyboard onKeyEvent={(val) => props.onKeyEvent(val)} />
}

export default EditArea;