import {AfterViewInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Book} from "../../model/book";
import {BooksService} from "../../services/books.service";
import {Observable} from "rxjs";

@Component({
    selector: 'app-book-list',
    templateUrl: './book-list.component.html',
    styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements AfterViewInit, OnInit {

    books$: Observable<Book[]> | null = null;
    selectedBook: Book | null = null;

    constructor(private readonly bookService: BooksService) {
    }

    selectBook(book: Book): void {
        this.selectedBook = book;
    }

    bookUpdated(book: Book) {
        this.bookService.updateBook(book);
        this.selectedBook = null;
    }

    ngAfterViewInit(): void {
        console.log("after view init list");
        this.books$ = this.bookService.books$;
    }

    ngOnInit(): void {
        console.log("on init list");
    }
}
