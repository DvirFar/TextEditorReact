import styles from './TextArea.module.css';

function TextArea(props) {
    return <div className={styles.textarea}>
        {props.text}
    </div>
}

export default TextArea;