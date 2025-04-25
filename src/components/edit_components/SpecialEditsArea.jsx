import DeleteArea from "./special_edit_section/DeleteArea";
import SearchArea from "./special_edit_section/SearchArea";
import ReplaceArea from "./special_edit_section/ReplaceArea";
import styles from "./SpecialEditsArea.module.css"

function SpecialEditsArea(props) {
    return <div className={styles.specials} style={{"width":"30%"}}>
        <DeleteArea text={props.text} setText={props.setText} />
        <SearchArea />
        <ReplaceArea text={props.text} setText={props.setText} />
    </div>
}

export default SpecialEditsArea;