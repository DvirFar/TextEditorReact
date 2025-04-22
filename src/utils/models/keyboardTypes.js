import KeyClass from "./KeyClass";

const keyboardLayouts = {
    EnglishSml: [
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        ['z', 'x', 'c', 'v', 'b', 'n', 'm']
    ],
    EnglishCap: [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
    ],
    Hebrew: [
        ['ק', 'ר', 'א', 'ט', 'ו', 'ן', 'ם', 'פ'],
        ['ש', 'ד', 'ג', 'כ', 'ע', 'י',' ח', 'ל', 'ך', 'ף'],
        ['ז', 'ס', 'ב', 'ה', 'נ', 'מ', 'צ', 'ת', 'ץ']
    ],
    Digits: [
        ['1', '2', '3'],
        ['4', '5', '6'],
        ['7', '8', '9'],
        ['0']
    ],
    SpecialChars: [
        ['`', '~', '!', '@', '#', '$', '%', '^', '&', '*'],
        ['(', ')', '[', ']', '{', '}', '\\', '|', '\'', '"'],
        [';', ':', '<', '>', '/', '.', '?', '-', '_', '=', '+']
    ],
    Emojis: generateEmojiLayout()
};

function generateEmojiLayout() {
    const emojis = [];
    const ranges = [
        [0x1F600, 0x1F64F], // Emoticons
        [0x1F300, 0x1F5FF], // Miscellaneous Symbols and Pictographs
        [0x1F680, 0x1F6FF], // Transport and Map Symbols
        [0x1F700, 0x1F77F], // Alchemical Symbols
        [0x1F900, 0x1F9FF], // Supplemental Symbols and Pictographs
        [0x1FA70, 0x1FAFF], // Symbols and Pictographs Extended-A
        [0x2600, 0x26FF],   // Miscellaneous Symbols
        [0x2700, 0x27BF]    // Dingbats
    ];

    let row = [];
    for (const [start, end] of ranges) {
        for (let code = start; code <= end; code++) {
            row.push(String.fromCodePoint(code));
            if (row.length === 10) { // Create rows of 10 emojis
                emojis.push(row);
                row = [];
            }
        }
    }
    if (row.length > 0) {
        emojis.push(row); // Add the remaining emojis
    }
    return emojis;
}

export function getKeyboardLayout(type) {
    return keyboardLayouts[type].map(row => row.map(key => new KeyClass(key)));
}
