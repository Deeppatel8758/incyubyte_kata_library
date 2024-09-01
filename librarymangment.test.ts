import { Book } from "./modules/Book";
import { User } from "./modules/User";
import { Library } from "./modules/Library";

describe('Library System', () => {
    let library: Library;
    let book1: Book;
    let book2: Book;
    let user1: User;
    let user2: User;

   
    beforeEach(() => {
        library = new Library();
        book1 = new Book('Book 1', 'Author 1', 'ISBN123', 2023, 2);
        book2 = new Book('Book 2', 'Author 2', 'ISBN456', 2024, 1);
        user1 = new User('User 1', 'user1@example.com');
        user2 = new User('User 2', 'user2@example.com');

        library.addUser(user1);
        library.addUser(user2);
        library.addBook(book1);
        library.addBook(book2);
    });

    
    it('should add users and books correctly', () => {
        expect(library.getAvailableBooks().length).toBe(2);
        expect(library.getUserBorrowedBooks(user1.email).length).toBe(0);
    });

    it('should allow users to borrow and return books', () => {
        library.borrowBook('ISBN123', user1.email);
        expect(user1.borrowedBooks.length).toBe(1);
        expect(book1.quantity).toBe(1);
        expect(book1.available).toBe(true);

        library.returnBook('ISBN123', user1.email);
        expect(user1.borrowedBooks.length).toBe(0);
        expect(book1.quantity).toBe(2);
        expect(book1.available).toBe(true);
    });

    // errror genration 
    it('should handle invalid user or book data', () => {
        expect(() => library.addUser(null as any)).toThrow('Invalid user object: Must be an instance of User class.');
        expect(() => library.addBook(null as any)).toThrow('Invalid book object: Must be an instance of Book class.');
        expect(() => library.borrowBook('invalidISBN', user1.email)).toThrow('Book not found.');
        expect(() => library.returnBook('invalidISBN', user1.email)).toThrow('Book not found.');
    });

    it('should handle borrowing and returning errors', () => {
        expect(() => library.borrowBook('ISBN123', 'invalidUser@example.com')).toThrow('User not found.');
        expect(() => library.returnBook('ISBN123', 'invalidUser@example.com')).toThrow('User not found.');
        
        library.borrowBook('ISBN123', user1.email);
        expect(() => library.borrowBook('ISBN123', user1.email)).toThrow('Book already borrowed by this user.');
        
        library.borrowBook('ISBN456', user1.email);
        expect(() => library.borrowBook('ISBN456', user2.email)).toThrow('Book is not available for borrowing.');
    });

    // check avialbale or not 
    it('should return correct available books', () => {
        expect(library.getAvailableBooks().length).toBe(2);

        library.borrowBook('ISBN123', user1.email);
        expect(library.getAvailableBooks().length).toBe(2);

        library.borrowBook('ISBN456', user2.email);
        expect(library.getAvailableBooks().length).toBe(1);
    });

    // boorrow function 
    it('should return correct borrowed books by user', () => {
        library.borrowBook('ISBN123', user1.email);
        library.borrowBook('ISBN456', user1.email);

        const borrowedBooks = library.getUserBorrowedBooks(user1.email);
        expect(borrowedBooks.length).toBe(2);
        expect(borrowedBooks[0].isbn).toBe('ISBN123');
        expect(borrowedBooks[1].isbn).toBe('ISBN456');
    });

    // duplication test
    it('should not allow adding duplicate users or books', () => {
        expect(() => library.addUser(new User('User 1', 'user1@example.com'))).toThrow('User already exists.');
        expect(() => library.addBook(new Book('Book 1', 'Author 1', 'ISBN123', 2023, 2))).toThrow('Book already exists.');
    });

    
    it('should handle borrowing when quantity is zero', () => {
        library.borrowBook('ISBN456', user1.email);
        expect(() => library.borrowBook('ISBN456', user2.email)).toThrow('Book is not available for borrowing.');
    });

    it('should handle returning a book that was not borrowed', () => {
        expect(() => library.returnBook('ISBN123', user2.email)).toThrow('User not found.');
        library.borrowBook('ISBN123', user1.email);
        expect(() => library.returnBook('ISBN456', user1.email)).toThrow('Book not found.');
    });

    // qauntity check 
    it('should update book availability based on quantity', () => {
        expect(book1.available).toBe(true);
        library.borrowBook('ISBN123', user1.email);
        expect(book1.available).toBe(true);

        library.borrowBook('ISBN123', user2.email);
        expect(book1.available).toBe(false);

        library.returnBook('ISBN123', user1.email);
        expect(book1.available).toBe(true);
    });

    // user can not borrow more than n books here my code n is 2
    it('should enforce a borrowing limit per user (if implemented)', () => {
        const borrowingLimit = 2; // Example limit
        library.borrowBook('ISBN123', user1.email);
        library.borrowBook('ISBN456', user1.email);
        expect(() => library.borrowBook('ISBN789', user1.email)).toThrow('User has reached borrowing limit.');
    });

    // input valllidation
    it('should handle invalid ISBN formats', () => {
        expect(() => library.addBook(new Book('Book 3', 'Author 3', '', 2025, 3))).toThrow('Invalid book data: Missing required fields.');
        expect(() => library.borrowBook('', user1.email)).toThrow('Book not found.');
    });

    it('should handle invalid email formats', () => {
        expect(() => library.addUser(new User('User 3', 'invalid-email'))).toThrow('Invalid email format.');
    });

   
});
