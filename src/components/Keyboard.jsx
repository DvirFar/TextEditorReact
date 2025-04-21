import Key from "./Key";
import KeyClass from "../utils/models/KeyClass";

function Keyboard(props) {
    const values = [
        ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
        ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
        ['Caps-Lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter'],
        ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/']
    ]

    return (<div className="keyboard">
        <div className="keys-row numbers">
            {values[0].map((value) => {
                const keyClass = new KeyClass(value);
                return <Key key={keyClass.id} val={keyClass.value/*keyClass.getDisplayValue()*/} onKeyEvent={(val) => {props.onKeyEvent(val)}} />})
            }
        </div>
        <div className="keys-row">
            {values[1].map((value) => {
                const keyClass = new KeyClass(value);
                return <Key key={keyClass.id} val={keyClass.value/*keyClass.getDisplayValue()*/} onKeyEvent={(val) => {props.onKeyEvent(val)}} />})
            }
        </div>
        <div className="keys-row">
            {values[2].map((value) => {
                const keyClass = new KeyClass(value);
                return <Key key={keyClass.id} val={keyClass.value/*keyClass.getDisplayValue()*/} onKeyEvent={(val) => {props.onKeyEvent(val)}} />})
            }
        </div>
        <div className="keys-row">
            {values[3].map((value) => {
                const keyClass = new KeyClass(value);
                return <Key key={keyClass.id} val={keyClass.value/*keyClass.getDisplayValue()*/} onKeyEvent={(val) => {props.onKeyEvent(val)}} />})
            }
        </div>
        <div className="keys-row space">
            <Key key={KeyClass.id} val="Space" onKeyEvent={(val) => props.onKeyEvent(val)}></Key>
        </div>
    </div>);
}

export default Keyboard;