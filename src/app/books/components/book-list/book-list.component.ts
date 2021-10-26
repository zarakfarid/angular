import {Component, OnDestroy, OnInit} from '@angular/core';
import {Book} from "../../model/book";
import {BooksService} from "../../services/books.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-book-list',
    templateUrl: './book-list.component.html',
    styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnDestroy {

    books: Book[] = [];

    selectedBook: Book | null = null;

    private booksSubscription: Subscription;

    constructor(private readonly bookService: BooksService) {
        this.booksSubscription = this.bookService.books$.subscribe(value => {
           this.books = value;
        });
    }

    ngOnDestroy(): void {
        this.booksSubscription.unsubscribe();
    }

    selectBook(book: Book): void {
        this.selectedBook = book;
    }

    bookUpdated(book: Book) {
        this.bookService.updateBook(book);
        this.selectedBook = null;
    }
}
