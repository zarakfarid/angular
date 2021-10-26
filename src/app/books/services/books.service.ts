import { Injectable } from '@angular/core';
import {Book} from "../model/book";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable()
export class BooksService {

  books$: Subject<Book[]>;

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
    this.books$ = new BehaviorSubject<Book[]>(this.books);
  }

  updateBook(book: Book) {
    this.books = this.books
        .map(current => current.id === book.id ? book : current);
    this.books$.next(this.books);
  }
}
