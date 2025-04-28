

function DeleteArea({ text, setText }) {
    const deleteLastChar = () => {
        setText(text.slice(0, -1));
    };

    const deleteLastWord = () => {
        const words = text.match(/(?=\S+[\t ]$)|[\s\S]*.(?=(\n$))|[\s\S]*\s(?=\S+\s?$)|[\s\S]*\S(?=(\t|\s{2,}|\S+ )$)/);
        setText(words ? words[0] : "");
    };

    const deleteAllText = () => {
        setText("");
    };

    return (
        <div>
            <button onClick={deleteLastChar}>Delete Character</button>
            <button onClick={deleteLastWord}>Delete Word</button>
            <button onClick={deleteAllText}>Delete Text</button>
        </div>
    );
}

export default DeleteArea;