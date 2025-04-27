

function saveFileAs(userName, filename, content) {
    const user = JSON.parse(localStorage.getItem(userName));

    user.files[filename] = content;

    localStorage.setItem(userName, JSON.stringify(user));
}

function openFile(userName, filename) {
    const user = JSON.parse(localStorage.getItem(userName));
    return user.files[filename];
}

export { saveFileAs, openFile };