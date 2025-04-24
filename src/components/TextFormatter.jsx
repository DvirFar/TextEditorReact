import { createContext, useState, useContext } from 'react';

// Create a context for text formatting
export const FormattingContext = createContext();

export function useFormatting() {
    return useContext(FormattingContext);
}

export function TextFormatterProvider({ children }) {
    // State for text formatting options
    const [formatting, setFormatting] = useState({
        bold: false,
        italic: false,
        underline: false,
        fontSize: 'medium',
        fontFamily: 'default',
        color: 'black',
        alignment: 'left'
    });

    // Simplified toggle function focusing specifically on formatting options
    const toggleFormat = (formatType) => {
        if (['bold', 'italic', 'underline'].includes(formatType)) {
            // For the troublesome formatting options, use a more explicit approach
            setFormatting(prevState => {
                const newValue = !prevState[formatType];
                alert(`Changing ${formatType} from ${prevState[formatType]} to ${newValue}`);
                return {
                    ...prevState,
                    [formatType]: newValue
                };
            });
        } 
        else if (['small', 'medium', 'large'].includes(formatType)) {
            setFormatting(prev => ({
                ...prev,
                fontSize: formatType
            }));
        } 
        else if (['default', 'serif', 'sans-serif', 'monospace', 'cursive'].includes(formatType)) {
            setFormatting(prev => ({
                ...prev,
                fontFamily: formatType
            }));
        } 
        else if (['black', 'red', 'blue', 'green'].includes(formatType)) {
            setFormatting(prev => ({
                ...prev,
                color: formatType
            }));
        } 
        else if (['left', 'center', 'right'].includes(formatType)) {
            setFormatting(prev => ({
                ...prev,
                alignment: formatType
            }));
        }
    };

    return (
        <FormattingContext.Provider value={{ formatting, toggleFormat }}>
            {children}
        </FormattingContext.Provider>
    );
}