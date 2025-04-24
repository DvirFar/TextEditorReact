import StyleArea from "./StyleArea";
import KeyboardArea from "./KeyboardArea";
import SpecialEditsArea from "./SpecialEditsArea";
import { useFormatting } from "./TextFormatter";

function EditArea(props) {
    const { toggleFormat } = useFormatting();

    const handleStyleChange = (styleType) => {
        toggleFormat(styleType);
        if (props.onStyleApply) {
            props.onStyleApply(styleType);
        }
    };

    return <>
        <StyleArea onStyleChange={handleStyleChange} />
        <KeyboardArea onKeyEvent={(val) => props.onKeyEvent(val)} />
        <SpecialEditsArea />
    </>
}

export default EditArea;