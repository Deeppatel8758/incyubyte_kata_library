import { Book } from "./Book";
import { User } from "./User";
export class Library {
    private books: Book[];
    private users: User[];

    constructor() {
        this.books = [];
        this.users = [];
    }

    addUser(user: User) {
        // user validation
        if (!(user instanceof User)) {
            throw new Error('Invalid user object: Must be an instance of User class.');
        }

      //alresy exist 
        if (this.users.find((u) => u.email === user.email)) {
            throw new Error('User already exists.');
        }

        this.users.push(user);
    }

    addBook(book: Book) {

        if (!(book instanceof Book)) {
            throw new Error('Invalid book object: Must be an instance of Book class.');
        }

        if (this.books.find((b) => b.isbn === book.isbn)) {
            throw new Error('Book already exists.');
        }

        this.books.push(book);
    }

    borrowBook(isbn: string, userId: string) {
        const book = this.books.find((b) => b.isbn === isbn);
        if (!book) {
            throw new Error('Book not found.');
        }

        const user = this.users.find((u) => u.email === userId);
        if (!user) {
            throw new Error('User not found.');
        }

        user.borrowBook(book);
    }

    returnBook(isbn: string, userId: string) {
        const book = this.books.find((b) => b.isbn === isbn);
        if (!book) {
            throw new Error('Book not found.');
        }

        const user = this.users.find((u) => u.email === userId);
        if (!user) {
            throw new Error('User not found.');
        }

        user.returnBook(isbn);
    }

    getAvailableBooks() {
        return this.books.filter((book) => book.available);
    }

    getUserBorrowedBooks(userId: string) {
        const user = this.users.find((u) => u.email === userId);
        if (!user) {
            throw new Error('User not found.');
        }

        return user.borrowedBooks;
    }
}