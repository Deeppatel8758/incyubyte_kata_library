export class Book {
    constructor(
        public title: string,
        public author: string,
        public isbn: string,
        public publicationYear: number,
        public quantity: number = 1,
        public available: boolean = true
    ) {
      //inp validation
        if (!title || !author || !isbn || !publicationYear) {
            throw new Error('Invalid book data: Missing required fields.');
        }

        if (typeof title !== 'string' || typeof author !== 'string' || typeof isbn !== 'string') {
            throw new Error('Invalid book data: Title, author, and ISBN must be strings.');
        }

        if (typeof publicationYear !== 'number' || publicationYear < 0) {
            throw new Error('Invalid book data: Publication year must be a positive number.');
        }

        if (typeof quantity !== 'number' || quantity < 0) {
            throw new Error('Invalid book data: Quantity must be a non-negative number.');
        }

        this.available = quantity > 0;
    }
}