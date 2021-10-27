import { Injectable } from '@angular/core';
import {Book} from "../model/book";
import {BehaviorSubject, Observable} from "rxjs";
import {delay} from "rxjs/operators";

@Injectable()
export class BooksService {

  readonly books$: Observable<Book[]>;

  private readonly _books$: BehaviorSubject<Book[]>;

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

  constructor() {
    this._books$ = new BehaviorSubject<Book[]>(this.books);
    this.books$ = this._books$.pipe(delay(1000));
  }

  updateBook(book: Book) {
    this.books = this.books
        .map(current => current.id === book.id ? book : current);
    this._books$.next(this.books);
  }
}
