import TextArea from './TextArea';
import styles from './MultiTextAreaManager.module.css';

function MultiTextAreaManager({ texts, formattings, activeIndex, onTextChange }) {
  return (
    <div className={styles.multiTextAreaContainer}>
      {texts.map((text, index) => (
        <div 
          key={index} 
          className={`${styles.textAreaWrapper} ${activeIndex === index ? styles.active : ''}`}
          onClick={() => onTextChange(index)}
        >
          <TextArea 
            text={text} 
            formatting={formattings[index]} 
          />
        </div>
      ))}
    </div>
  );
}

export default MultiTextAreaManager;