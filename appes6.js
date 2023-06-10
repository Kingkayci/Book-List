class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book) {
        const list = document.getElementById('book-list');
   // Create tr element 
    const row = document.createElement('tr');
    // Insert cols
    row.innerHTML = `
        <th>${book.title}</th>
        <th>${book.author}</th>
        <th>${book.isbn}</th>
        <th><a href="#" class="delete">X<a></th>
    `;

    list.appendChild(row);
    }

    showAlert(message, className) {
        // Create a div
    const div = document.createElement('div');
    // Add className
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector('.container');
    // Get form
    const form = document.querySelector('#book-form');
    // Insert Alert
    container.insertBefore(div, form);
    
    // Timeout after 3 sec
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 2800);

    }

    deleteBook(target) {
        if(target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }

    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
} 

// Local storage class
class Store {
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        }
        else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static displayBooks() {
        const books = Store.getBooks();

        books.forEach(function(book){
            const ui = new UI;

            // Add book to UI
            ui.addBookToList(book);
        });
    }

    static addBook(book) {
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();

        books.forEach(function(book, index){
           if(book.isbn === isbn) {
            books.splice(index, 1);
           } 
        });

        localStorage.setItem('books', JSON.stringify(books));
        
    }
}

// DOM load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

// Event Listener for add book
document.getElementById('book-form').addEventListener('submit', 
function(e) {
    // Get form values
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value

// Instantiate Book object
const book = new Book(title, author, isbn);

// Instantiate UI object
const ui = new UI();

// Validate 
if(title === '' || author === '' || isbn === '') {
    // Error alert
    ui.showAlert('Please fill in all fields', 'error');
} else {
    // Add book to list
    ui.addBookToList(book);

    // Add to LS
    Store.addBook(book);
 
    // Show success
    ui.showAlert('Book Added', 'success');

    // Clear fields 
    ui.clearFields();
}
    e.preventDefault();
});

// Event listener for delete book
document.getElementById('book-list').addEventListener('click', function(e){
    const ui = new UI();

    // Delete Book
    ui.deleteBook(e.target);
    
    // Remove from Ls
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    // Show alert
    ui.showAlert('Book removed', 'success');

    e.preventDefault();
});