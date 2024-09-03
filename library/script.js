const title = document.getElementById("title");
const author = document.getElementById("authorName");
const noOfPages = document.getElementById("pages");
const addBook = document.getElementById("addBook");
const form = document.getElementById('form');
const table = document.getElementById('bookTable');

form.addEventListener('submit', (e) => e.preventDefault());


function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.info = () => {
        return (`${title}, by ${author}, ${pages} pages, ${isRead}`);
    };
}

const myLibrary = [];

function addBookToLibrary() {
    const read = document.querySelector('input[name="book-read-or-not"]:checked');
    const newBook = new Book(title.value, author.value, noOfPages.value, read ? 'yes' : 'No');
    myLibrary.push(newBook);
    renderLibrary();
    form.reset();
}

function renderLibrary() {
    table.innerHTML = `
        <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Pages</th>
            <th>Read?</th>
        </tr>
    `;

    myLibrary.forEach((book, index) => {
        const newRow = table.insertRow();
        newRow.insertCell(0).textContent = book.title;
        newRow.insertCell(1).textContent = book.author;
        newRow.insertCell(2).textContent = book.pages;
        newRow.insertCell(3).textContent = book.isRead;

        const removeButton = document.createElement('button')
        removeButton.textContent = 'Remove Book'
        removeButton.addEventListener('click', ()=>{
            myLibrary.splice(index, 1)
            renderLibrary()
        })

        const actionCell = newRow.insertCell(4);
        actionCell.appendChild(removeButton)
        
    });
}

renderLibrary();

addBook.addEventListener('click', addBookToLibrary);
