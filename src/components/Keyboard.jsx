import Key from "./Key";
import { getKeyboardLayout } from "../utils/models/keyboardTypes";
import KeyClass from "../utils/models/KeyClass";
import styles from "./Keyboard.module.css"

function Keyboard(props) {

    const handleKeyEvent = (key) => {
        if (key.isSpecial) {
            console.log(`Special key pressed: ${key.value}`);
            handleSpecialKeys(key.value);
        } else {
            console.log(`Key pressed: ${key.value}`);
            props.onKeyEvent(key.value);
        }
    };

    const handleSpecialKeys = (value) => {
        switch (value) {
            case 'Enter': { props.onKeyEvent("\n"); break; }
            case 'Tab': { props.onKeyEvent("\t"); break; }
            case 'Space': { props.onKeyEvent(" "); break; }
        }
    }

    return (
        <div className={styles.keyboard}>
            {getKeyboardLayout(props.type).map((row, rowIndex) => (
                <div key={rowIndex} className="keys-row">
                    {row.map((keyClass) => (
                        <Key
                            key={keyClass.id}
                            val={keyClass.getDisplayValue()}
                            onKeyEvent={() => handleKeyEvent(keyClass)}
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
                    key={KeyClass.id}
                    val="Enter"
                    onKeyEvent={() => handleKeyEvent(new KeyClass('Enter', true))}
                />
            </div>
        </div>
    );
}

export default Keyboard;