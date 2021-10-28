import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Book} from "../../model/book";
import {BooksService} from "../../services/books.service";
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-book-list',
    templateUrl: './book-list.component.html',
    styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements AfterViewInit, OnInit {

    books$: Observable<Book[]> | null = null;

    constructor(
        private readonly bookService: BooksService,
        private readonly router: Router,
        private readonly route: ActivatedRoute) {
    }

    async selectBook(book: Book) {
        await this.router.navigate(["edit"], { relativeTo: this.route, state: book });
    }

    ngAfterViewInit(): void {
        console.log("after view init list");
        this.books$ = this.bookService.books$;
    }

    ngOnInit(): void {
        console.log("on init list");
    }
}
