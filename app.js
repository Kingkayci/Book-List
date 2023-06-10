// Book constructor
function Book (title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI constructor
function UI() {}

// Add Book To List
UI.prototype.addBookToList = function(book) {
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

// Show Alert
UI.prototype.showAlert = function (message, className) {
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

// Delete book
UI.prototype.deleteBook = function(target) {
    if(target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}

// Clear fields
UI.prototype.clearFields = function() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

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
 
    // Show success
    ui.showAlert('Book Added', 'success');

    // Clear fields 
    ui.clearFields();
}
    e.preventDefault();
});

// Event listener for delete
document.getElementById('book-list').addEventListener('click', function(e){
    const ui = new UI();

    ui.deleteBook(e.target);
    
    // Show alert
    ui.showAlert('Book removed', 'success');

    e.preventDefault();
});