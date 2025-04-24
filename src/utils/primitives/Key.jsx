

function Key(props) {
    return (
    <button onClick={() => props.onKeyEvent(props.val)} style={{"paddingRight":props.keyWidth, "paddingLeft":props.keyWidth}}>
    {props.val}
    </button>
    );
}

export default Key;