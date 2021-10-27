import { Injectable } from '@angular/core';
import {Book} from "../model/book";
import {BehaviorSubject, Observable} from "rxjs";
import {delay, tap} from "rxjs/operators";
import {SpinnerService} from "../../shared/services/spinner.service";

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

  constructor(private readonly spinnerService: SpinnerService) {
    this._books$ = new BehaviorSubject<Book[]>(this.books);
    this.books$ = this._books$.pipe(
        tap(_ => this.spinnerService.show()),
        delay(1000),
        tap( _ => this.spinnerService.hide())
    );
  }

  updateBook(book: Book) {
    this.books = this.books
        .map(current => current.id === book.id ? book : current);
    this._books$.next(this.books);
  }
}
