import {Component} from '@angular/core';
import {Book} from "../../model/book";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-book-list',
    templateUrl: './book-list.component.html',
    styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent {

    books: Book[];

    constructor(
        private readonly router: Router,
        private readonly route: ActivatedRoute) {
        this.books = this.route.snapshot.data.books;
    }

    async selectBook(book: Book) {
        await this.router.navigate(["edit"], {relativeTo: this.route, state: book});
    }

}
