import {Component, OnInit} from '@angular/core';
import {Book} from "../../model/book";

@Component({
    selector: 'app-book-list',
    templateUrl: './book-list.component.html',
    styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

    books: Book[] = [
        {
            id: 1,
            title: 'Solaris',
            author: 'Stanisław Lem',
            year: 1960
        },
        {
            id: 2,
            title: '2001: A Space Odyssey',
            author: 'Arthur C Clarke',
            year: 1968
        },
        {
            id: 3,
            title: 'Ubik',
            author: 'Phillip K Dick',
            year: 1965
        }
    ];

    selectedBook: Book | null = null;

    constructor() {
    }

    ngOnInit(): void {
    }

    selectBook(book: Book): void {
        this.selectedBook = book;
    }
}
