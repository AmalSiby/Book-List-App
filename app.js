// Book Class : Represent a Book

class Book {
    constructor(title,author,isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI Class: Handle UI Tasks

class UI {

    static displayBooks(){
        const books = Store.getBooks();
        books.forEach((book) => UI.addBookToList(book));
    }

    // Adding book to list

    static addBookToList(book){
        const list = document.getElementById('book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }

    // Delete book

    static deleteBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }

    // UI alert
    static showAlert(msg, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(msg));
        const container = document.querySelector('.container');
        const form = document.getElementById('book-form');
        container.insertBefore(div, form);

        // vanish after few seconds
        setTimeout(() => document.querySelector('.alert').remove(),3000);
    }
    // clear the fields

    static clearFields(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }

}

// Store Class: Handle Local Storage

class Store{

    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }

    static removeBook(isbn){
        const books = Store.getBooks();

        books.forEach((book,index) => {
            if(book.isbn === isbn){
                books.splice(index,1);
            }
        });

        localStorage.setItem('books',JSON.stringify(books));
    }

}

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);


// Event: Add a Book
document.getElementById('book-form').addEventListener('submit', 
(e) => {
    // prevent submit action 
    e.preventDefault();

    //Get form values
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    // validate
    if(title === "" || author === "" || isbn === ""){
        UI.showAlert('Please fill in all fields','danger');
    }else{
        // Instatiate books

        const book = new Book(title,author,isbn);

        // Add Book to UI
        UI.addBookToList(book);

        // Add book to Storage
        Store.addBook(book);

        // show success
        UI.showAlert('Book Added','success');

        // clear fields
        UI.clearFields();
    }
    
});

// Event: Remove a Book

document.getElementById('book-list').addEventListener('click', 
(e) => {
    // Remove book from UI
    UI.deleteBook(e.target);

    // remove book from storage
    Store.removeBook
    (e.target.parentElement.previousElementSibling.textContent);

    // show success
    UI.showAlert('Book Removed','success');
});
