import DeleteArea from "./special_edit_section/DeleteArea";
import SearchArea from "./special_edit_section/SearchArea";
import ReplaceArea from "./special_edit_section/ReplaceArea";
import UndoArea from "./special_edit_section/UndoArea";

function SpecialEditsArea() {
    return <>
        <DeleteArea />
        <SearchArea />
        <ReplaceArea />
        <UndoArea />
    </>
}

export default SpecialEditsArea;