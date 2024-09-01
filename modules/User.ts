import { Book } from "./Book";
export class User {
    constructor(
        public name: string,
        public email: string,
        public borrowedBooks: Book[] = []
    ) {
        // user validation 
        if (!name || !email) {
            throw new Error('Invalid user data: Missing required fields.');
        }

        if (typeof name !== 'string' || typeof email !== 'string') {
            throw new Error('Invalid user data: Name and email must be strings.');
        }

        // email validation
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)) {
            throw new Error('Invalid email format.');
        }
    }

    borrowBook(book: Book) {
        // Check if book is already borrowed by the user
        if (this.borrowedBooks.find((b) => b.isbn === book.isbn)) {
            throw new Error('Book already borrowed by this user.');
        }

        // Check if book is available
        if (!book.available) {
            throw new Error('Book is not available for borrowing.');
        }

        this.borrowedBooks.push(book);
        book.quantity--;
        book.available = book.quantity > 0;
    }

    returnBook(isbn: string) {
        const bookIndex = this.borrowedBooks.findIndex((book) => book.isbn === isbn);
        if (bookIndex !== -1) {
            const returnedBook = this.borrowedBooks.splice(bookIndex, 1)[0];
            returnedBook.quantity++;
            returnedBook.available = returnedBook.quantity > 0;
            return returnedBook;
        }
        return null;
    }
}