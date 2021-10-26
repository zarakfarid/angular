import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Book} from "../../model/book";

@Component({
  selector: 'app-books-details',
  templateUrl: './books-details.component.html',
  styleUrls: ['./books-details.component.scss']
})
export class BooksDetailsComponent {

  _book: Book | null = null;

  @Input()
  get book() {
    return this._book;
  }

  set book(value: Book | null) {
    this._book = value ? {...value} : null;
  }

  @Output()
  bookUpdated = new EventEmitter<Book>();

  save() {
    if(this._book) {
      this.bookUpdated.emit(this._book);
    }
  }

  revert() {
    console.log("Revert clicked!");
  }
}
