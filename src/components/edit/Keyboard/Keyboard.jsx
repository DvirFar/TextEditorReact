import Key from '../../common/Key'
import { getKeyboardLayout } from '../../../utils/keyboardTypes';
import KeyClass from "../../../utils/KeyClass";
import styles from "./Keyboard.module.css"

function Keyboard(props) {

    const handleKeyEvent = (key) => {
        if (key.isWhiteSpace) {
            console.log(`White Space pressed: ${key.value}`);
            handleWhiteSpace(key.value);
        } else {
            console.log(`Key pressed: ${key.value}`);
            props.onKeyEvent(key.value);
        }
    };

    const handleWhiteSpace = (value) => {
        switch (value) {
            case 'Enter': { props.onKeyEvent("\n"); break; }
            case 'Tab': { props.onKeyEvent("\t"); break; }
            case 'Space': { props.onKeyEvent(" "); break; }
        }
    }

    let keyWidth;

    switch (props.type) {
        case "Emojis": {
            keyWidth = "0.6em";
            break;
        }
        case "SpecialChars": {
            keyWidth = "0.9em";
            break;
        }
        default: {
            keyWidth = "0.8em";
            break;
        }
    };

    return (
        <div className={styles.keyboard}>
            {getKeyboardLayout(props.type).map((row, rowIndex) => (
                <div key={rowIndex} className="keys-row">
                    {row.map((keyClass) => (
                        <Key
                            key={keyClass.id}
                            val={keyClass.value}
                            onKeyEvent={() => handleKeyEvent(keyClass)}
                            keyWidth={keyWidth}
                        />
                    ))}
                </div>
            ))}
            <div className="keys-row spaces">
                <Key
                    key={KeyClass.id++}
                    val="Tab"
                    onKeyEvent={() => handleKeyEvent(new KeyClass('Tab', true))}
                />
                <Key
                    key={KeyClass.id++}
                    val="Space"
                    onKeyEvent={() => handleKeyEvent(new KeyClass('Space', true))}
                />
                <Key
                    key={KeyClass.id++}
                    val="Enter"
                    onKeyEvent={() => handleKeyEvent(new KeyClass('Enter', true))}
                />
            </div>
        </div>
    );
}

export default Keyboard;