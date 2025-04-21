

function Key(props) {
    return (
    <button onClick={() => props.onKeyEvent(props.val)} style={{"margin": "10px"}}>
    {props.val}
    </button>
    );
}

export default Key;