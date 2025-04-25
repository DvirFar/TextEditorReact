import { useFormatting } from './TextFormatter'
import styles from './TextArea.module.css'

function TextArea({ text }) {
  const { formatting } = useFormatting();
  
  // Apply the style directly in the JSX using inline styles
  return (<div>
      <div className='fileName'>
        
      </div>
      <div 
        className={styles.textarea} 
        style={{
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
        }}
      >
        {/* Include debugging information in the text area */}
        <div style={{color: 'gray', fontSize: '0.8em', marginBottom: '10px', fontWeight: 'normal', fontStyle: 'normal', textDecoration: 'none'}}>
          Bold: {formatting.bold ? 'ON' : 'OFF'}, 
          Italic: {formatting.italic ? 'ON' : 'OFF'}, 
          Underline: {formatting.underline ? 'ON' : 'OFF'}
        </div>
        {text || "Type something..."}
      </div>
    </div>
  );
}

export default TextArea;