import {Injectable} from '@angular/core';
import {Book} from "../model/book";
import {SpinnerService} from "../../shared/services/spinner.service";
import {Observable, of} from "rxjs";
import {delay, map, tap} from "rxjs/operators";

const DELAY = 1000;

@Injectable()
export class BooksService {

    private books: Book[] = [
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

    constructor(private readonly spinnerService: SpinnerService) {
    }

    getAllBooks(): Observable<Book[]> {
        return of(this.books);
    }

    findBooks(query: string): Observable<Book[]> {
        const compare = (left: string, right: string) => {
            return left.toUpperCase().indexOf(right.toUpperCase()) >= 0;
        }
        const searchFn = (query: string) => {
          return (book: Book) => compare(book.title, query) || compare(book.author, query);
        };
        return of(this.books.filter(searchFn(query)));
    }

    getBook(id: number): Observable<Book | undefined> {
        return of(this.books.find(value => value.id === id));
    }

    updateBook(book: Book): Observable<Book> {
        if (book.id !== null) {
            this.books = this.books.map(current => current.id === book.id ? book : current);
            return this.getBook(book.id).pipe(map(value => value!));
        } else {
            throw Error("Book does not have an id.");
        }
    }
}
