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
    ]
};

export function getKeyboardLayout(type) {
    return keyboardLayouts[type].map(row => row.map(key => new KeyClass(key)));
}
