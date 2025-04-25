

function saveFileAs(filename, content) {
    localStorage.setItem(filename, JSON.stringify(content));
}

function openFile(filename) {
    const content = localStorage.getItem(filename);
    return content ? JSON.parse(content) : null;
}

export { saveFileAs, openFile };