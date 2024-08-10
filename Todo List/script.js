const searchBar = document.getElementById("searchBar");
const addItem = document.getElementById("addItem");
const listContainer = document.getElementById("listContainer");
const clearItems = document.getElementById("clearItems");

function createTaskElement(taskText) {
    const item = document.createElement("li");
    item.className = "item";
    item.innerHTML = `
        ${taskText}
        <span class="icons">
            <i class="fas fa-edit"></i>
            <i class="fas fa-trash-alt"></i>
        </span>
    `;

    const editButton = item.querySelector(".fa-edit");
    const deleteButton = item.querySelector(".fa-trash-alt");

    editButton.addEventListener("click", () => {
        searchBar.value = taskText;
        listContainer.removeChild(item);
    });

    deleteButton.addEventListener("click", () => {
        listContainer.removeChild(item);
    });

    return item;
}

function addTask() {
    const taskText = searchBar.value.trim();
    if (taskText === "") {
        alert("Please add a task first");
        return;
    }
    const taskElement = createTaskElement(taskText);
    listContainer.appendChild(taskElement);
    searchBar.value = "";
}

addItem.addEventListener("click", addTask);

searchBar.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});

clearItems.addEventListener("click", () => {
    listContainer.innerHTML = "";
});