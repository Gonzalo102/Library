let myLibrary = JSON.parse(localStorage.getItem('library')) || [];

const addLibrary = document.getElementById('submit');
const newButton = document.querySelector('.newButton');
const closeButton = document.querySelector('.closeButton');
const container = document.querySelector('.container');

addLibrary.addEventListener('click', addBookToLibrary);
addLibrary.addEventListener('click', displayForm);
addLibrary.addEventListener('click', () => displayBooks(myLibrary.length - 1));
newButton.addEventListener('click', displayForm);
closeButton.addEventListener('click', displayForm);
container.addEventListener('click', toogleReadStatus);

function Book (title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary() {
 	const input1 = document.getElementById('title').value;
    const input2 = document.getElementById('author').value;
    const input3 = document.getElementById('pages').value;
    const input4 = document.getElementById('read').checked;

    myLibrary.push( new Book(input1, input2, input3, input4));
    localStorage.setItem('library', JSON.stringify(myLibrary));
}

function displayBooks(i){

    const newDiv = document.createElement("div");
    newDiv.classList.add("book-card");
    const newTitle = document.createElement("h2");
    const newAuthor = document.createElement("h2");
    const newPages = document.createElement("h2");
    const newLabel = document.createElement("label");
    const newCheckbox = document.createElement("input");
    const newDeleteButton = document.createElement("button");

    newTitle.textContent = myLibrary[i].title;
    newAuthor.textContent = myLibrary[i].author;
    newPages.textContent = myLibrary[i].pages;
    newLabel.textContent = "Read";

    newLabel.classList.add('readlabel');

    newCheckbox.type = "checkbox";
    newCheckbox.name = "user_read_button";

    myLibrary[i].read ? newCheckbox.checked = true : newCheckbox.checked = false;
    newCheckbox.setAttribute('data-position', i);

    newDeleteButton.setAttribute('data-index', i);
    newDeleteButton.textContent = "Delete";
    newDeleteButton.classList.add('deleteButton');
    newDeleteButton.addEventListener('click', deleteCard);

    newLabel.appendChild(newCheckbox);
    newDiv.appendChild(newTitle);
    newDiv.appendChild(newAuthor);
    newDiv.appendChild(newPages);    
    newDiv.appendChild(newLabel);
    newDiv.appendChild(newDeleteButton);
    container.appendChild(newDiv);
}

function displayForm(){
	const form = document.querySelector('.form');
    form.classList.toggle("display");
}

function deleteCard() {
    const ind = Number(this.getAttribute('data-index'));
    const parent = this.parentElement;
    parent.parentElement.removeChild(parent);
    if (ind > -1) {
        myLibrary.splice(ind, 1);
	}
    localStorage.setItem('library', JSON.stringify(myLibrary));
}

function displayBooksInStorage(myLibrary) {
    for (let i = 0; i < myLibrary.length; i++) {
        displayBooks(i);
    }
}

function toogleReadStatus(e) {

    if (!e.target.matches('input')) return; // skip this unless it's an input
    const el = e.target;
    const index = el.dataset.position;
    myLibrary[index].read = !myLibrary[index].read;
    localStorage.setItem('library', JSON.stringify(myLibrary));
}

displayBooksInStorage(myLibrary);