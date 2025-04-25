

function SaveArea({ onSave, onOpen }) {
    
    function handleSave() {
        const getNewName = document.body.querySelector("#saveOpen").value;
        const fileName = getNewName || sessionStorage.getItem('CurrentFileName');

        onSave(fileName);
    }

    function handleOpen() {
        const getNewName = document.body.querySelector("#saveOpen").value;
        const fileName = getNewName || sessionStorage.getItem('CurrentFileName');

        onOpen(fileName)
    }

    return <div>
        <form>
            <input type="submit" formAction={handleOpen} value="Open" />
            <input type="text" id="saveOpen" name="saveOpen" placeholder="Open File or Save As:" />
            <input type="submit" formAction={handleSave} value="Save" />
        </form>
    </div>
}

export default SaveArea;