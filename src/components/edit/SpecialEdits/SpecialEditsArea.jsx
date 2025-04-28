import DeleteArea from "./DeleteArea";
import SearchArea from "./SearchArea";
import ReplaceArea from "./ReplaceArea";
import styles from "./SpecialEditsArea.module.css"

function SpecialEditsArea(props) {
    return <div className={styles.specials} >
        <DeleteArea text={props.text} setText={props.setText} />
        <ReplaceArea text={props.text} setText={props.setText} />
    </div>
}

export default SpecialEditsArea;