class KeyClass {
    static id = 0;

    constructor(value, /*isSpecial = false*/) {
        this.id = KeyClass.id++;
        this.value = value;
        //this.isSpecial = isSpecial;
    }

    getDisplayValue() {
        return this.isSpecial ? `[${this.value}]` : this.value;
    }
}

export default KeyClass;