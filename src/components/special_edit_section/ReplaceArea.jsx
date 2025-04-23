import styles from "./ReplaceArea.module.css"

function ReplaceArea(props) {

    const replaceOnce = () => {
        const src = document.body.querySelector("#find-string").value;
        const dst = document.body.querySelector("#replace-string").value;
        
        props.setText(props.text.replace(src, dst));
    }

    const replaceAll = () => {
        const src = document.body.querySelector("#find-string").value;
        const dst = document.body.querySelector("#replace-string").value;
        
        props.setText(props.text.replaceAll(src, dst));
    }

    return <div className={styles.replaceArea}>
        <form>
            <input type="text" id="find-string" name="find-string" placeholder="Find string" />
            <input type="text" id="replace-string" name="replace-string" placeholder="Replace with string" />
            <input type="submit" name="replace" formAction={replaceOnce} value="Replace First" />
            <input type="submit" name="replace" formAction={replaceAll} value="Replace All" />
        </form>
    </div>
}

export default ReplaceArea;