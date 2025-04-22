

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
            <button onClick={deleteLastChar}>Delete Last Character</button>
            <button onClick={deleteLastWord}>Delete Last Word</button>
            <button onClick={deleteAllText}>Delete All Text</button>
        </div>
    );
}

export default DeleteArea;

// jkljfdk jkgfl djk jkgf jk