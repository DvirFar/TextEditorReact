

function saveFileAs(userName, filename, content) {
    let user = JSON.parse(localStorage.getItem(userName));

    let userFiles = user.files;
    console.log(userFiles);
    
    userFiles[filename] = content;
    user = {...user, files: userFiles};

    localStorage.setItem(userName, JSON.stringify(user));
}

function openFile(userName, filename) {
    const user = JSON.parse(localStorage.getItem(userName));
    return user.files[filename];
}

export { saveFileAs, openFile };