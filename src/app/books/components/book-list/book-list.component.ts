import {Component} from '@angular/core';
import {Book} from "../../model/book";
import {BooksService} from "../../services/books.service";
import {Observable} from "rxjs";

@Component({
    selector: 'app-book-list',
    templateUrl: './book-list.component.html',
    styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent {

    readonly books$: Observable<Book[]>;

    selectedBook: Book | null = null;

    constructor(private readonly bookService: BooksService) {
        this.books$ = this.bookService.books$;
    }

    selectBook(book: Book): void {
        this.selectedBook = book;
    }

    bookUpdated(book: Book) {
        this.bookService.updateBook(book);
        this.selectedBook = null;
    }
}
