import DeleteArea from "./special_edit_section/DeleteArea";
import SearchArea from "./special_edit_section/SearchArea";
import ReplaceArea from "./special_edit_section/ReplaceArea";
import UndoArea from "./special_edit_section/UndoArea";

function SpecialEditsArea(props) {
    return <div className="specials">
        <DeleteArea text={props.text} setText={props.setText} />
        <SearchArea />
        <ReplaceArea text={props.text} setText={props.setText} />
        <UndoArea />
    </div>
}

export default SpecialEditsArea;