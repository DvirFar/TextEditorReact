import { useFormatting } from '../main_components/TextFormatter';
import styles from './StyleArea.module.css';

function StyleArea(props) {
    const { formatting, toggleFormat } = useFormatting();

    const handleStyleClick = (style) => {
        // Add an alert to see what's happening when we click format buttons
        alert(`Toggling ${style}. Current value: ${formatting[style]}`);
        toggleFormat(style);
        
        if (props.onStyleChange) {
            props.onStyleChange(style);
        }
    };

    return (
        <div className={styles.styleArea}>
            <h3>Text Styling</h3>
            <div className={styles.styleOptions}>
                <div className={styles.styleGroup}>
                    <h4>Format</h4>
                    <button 
                        className={formatting.bold ? styles.active : ''}
                        onClick={() => handleStyleClick('bold')}
                    >
                        <span className={styles.bold}>B</span>
                    </button>
                    <button 
                        className={formatting.italic ? styles.active : ''}
                        onClick={() => handleStyleClick('italic')}
                    >
                        <span className={styles.italic}>I</span>
                    </button>
                    <button 
                        className={formatting.underline ? styles.active : ''}
                        onClick={() => handleStyleClick('underline')}
                    >
                        <span className={styles.underline}>U</span>
                    </button>
                </div>

                {/* Rest of the component remains the same */}
                <div className={styles.styleGroup}>
                    <h4>Font Size</h4>
                    <button 
                        className={formatting.fontSize === 'small' ? styles.active : ''}
                        onClick={() => handleStyleClick('small')}
                    >
                        A<sup>-</sup>
                    </button>
                    <button 
                        className={formatting.fontSize === 'medium' ? styles.active : ''}
                        onClick={() => handleStyleClick('medium')}
                    >
                        A
                    </button>
                    <button 
                        className={formatting.fontSize === 'large' ? styles.active : ''}
                        onClick={() => handleStyleClick('large')}
                    >
                        A<sup>+</sup>
                    </button>
                </div>

                <div className={styles.styleGroup}>
                    <h4>Font Family</h4>
                    <select 
                        value={formatting.fontFamily}
                        onChange={(e) => handleStyleClick(e.target.value)}
                    >
                        <option value="default">Default</option>
                        <option value="serif">Serif</option>
                        <option value="sans-serif">Sans-serif</option>
                        <option value="monospace">Monospace</option>
                        <option value="cursive">Cursive</option>
                    </select>
                </div>

                <div className={styles.styleGroup}>
                    <h4>Text Color</h4>
                    <div className={styles.colorPicker}>
                        <button 
                            className={`${styles.colorBtn} ${styles.blackText} ${formatting.color === 'black' ? styles.active : ''}`}
                            onClick={() => handleStyleClick('black')}
                        />
                        <button 
                            className={`${styles.colorBtn} ${styles.redText} ${formatting.color === 'red' ? styles.active : ''}`}
                            onClick={() => handleStyleClick('red')}
                        />
                        <button 
                            className={`${styles.colorBtn} ${styles.blueText} ${formatting.color === 'blue' ? styles.active : ''}`}
                            onClick={() => handleStyleClick('blue')}
                        />
                        <button 
                            className={`${styles.colorBtn} ${styles.greenText} ${formatting.color === 'green' ? styles.active : ''}`}
                            onClick={() => handleStyleClick('green')}
                        />
                    </div>
                </div>

                <div className={styles.styleGroup}>
                    <h4>Alignment</h4>
                    <button 
                        className={formatting.alignment === 'left' ? styles.active : ''}
                        onClick={() => handleStyleClick('left')}
                    >
                        ←
                    </button>
                    <button 
                        className={formatting.alignment === 'center' ? styles.active : ''}
                        onClick={() => handleStyleClick('center')}
                    >
                        ↔
                    </button>
                    <button 
                        className={formatting.alignment === 'right' ? styles.active : ''}
                        onClick={() => handleStyleClick('right')}
                    >
                        →
                    </button>
                </div>
            </div>
        </div>
    );
}

export default StyleArea;