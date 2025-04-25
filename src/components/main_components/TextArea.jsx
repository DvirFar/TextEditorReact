import styles from './TextArea.module.css'

function TextArea({ text, formatting }) {
  // Apply the style directly in the JSX using inline styles
  return (
    <div className={styles.textarea}>
      {text ? (
        // Apply formatting only to actual text
        <div style={{
          fontWeight: formatting.bold ? 'bold' : 'normal',
          fontStyle: formatting.italic ? 'italic' : 'normal',
          textDecoration: formatting.underline ? 'underline' : 'none',
          color: formatting.color === 'red' ? '#ff5555' : 
                 formatting.color === 'blue' ? '#55aaff' : 
                 formatting.color === 'green' ? '#55cc55' : '#000',
          fontFamily: formatting.fontFamily === 'serif' ? 'Times New Roman, serif' :
                     formatting.fontFamily === 'sans-serif' ? 'Arial, Helvetica, sans-serif' :
                     formatting.fontFamily === 'monospace' ? 'Courier New, monospace' :
                     formatting.fontFamily === 'cursive' ? 'Brush Script MT, cursive' :
                     'system-ui, Avenir, Helvetica, Arial, sans-serif',
          fontSize: formatting.fontSize === 'small' ? '0.8em' :
                   formatting.fontSize === 'large' ? '1.4em' : '1em',
          textAlign: formatting.alignment
        }}>
          {text}
        </div>
      ) : (
        // Placeholder with default styling
        <div style={{
          fontWeight: 'normal',
          fontStyle: 'normal',
          textDecoration: 'none',
          color: '#888',
          fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
          fontSize: '1em',
          textAlign: 'left'
        }}>
          Type something...
        </div>
      )}
    </div>
  );
}

export default TextArea;