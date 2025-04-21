

function TextArea(props) {
    return <div id="textArea" style={{"width":"90%", "height":"200px","background":"white","color":"black", "border":"1px solid black"}}>
        {props.text}
    </div>
}

export default TextArea;