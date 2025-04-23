class KeyClass {
    static id = 0;

    constructor(value, isWhiteSpace = false) {
        this.id = KeyClass.id++;
        this.value = value;
        this.isWhiteSpace = isWhiteSpace;
    }
}

export default KeyClass;