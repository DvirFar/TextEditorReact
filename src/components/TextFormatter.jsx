import React, { createContext, useState, useContext } from 'react';

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
        fontSize: 'medium', // small, medium, large
        fontFamily: 'default',
        color: 'black',
        alignment: 'left'
    });

    // Function to toggle a formatting option
    const toggleFormat = (formatType) => {
        if (['bold', 'italic', 'underline'].includes(formatType)) {
            setFormatting(prev => ({
                ...prev,
                [formatType]: !prev[formatType]
            }));
        } else if (['small', 'medium', 'large'].includes(formatType)) {
            setFormatting(prev => ({
                ...prev,
                fontSize: formatType
            }));
        } else if (['default', 'serif', 'sans-serif', 'monospace', 'cursive'].includes(formatType)) {
            setFormatting(prev => ({
                ...prev,
                fontFamily: formatType
            }));
        } else if (['black', 'red', 'blue', 'green'].includes(formatType)) {
            setFormatting(prev => ({
                ...prev,
                color: formatType
            }));
        } else if (['left', 'center', 'right'].includes(formatType)) {
            setFormatting(prev => ({
                ...prev,
                alignment: formatType
            }));
        }
    };

    // Function to apply formatting to text
    const formatText = (text) => {
        return {
            text,
            formatting: { ...formatting }
        };
    };

    // Provide context values
    const contextValue = {
        formatting,
        toggleFormat,
        formatText
    };

    return (
        <FormattingContext.Provider value={contextValue}>
            {children}
        </FormattingContext.Provider>
    );
}