import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Book} from "../../model/book";

const makeCopy = (book: Book | null) => book ? {...book} : null;

@Component({
    selector: 'app-books-details',
    templateUrl: './books-details.component.html',
    styleUrls: ['./books-details.component.scss']
})
export class BooksDetailsComponent {

    _book: Book | null = null;

    private originalValue: Book | null = null;

    @Input()
    get book() {
        return this._book;
    }

    set book(value: Book | null) {
        this.originalValue = makeCopy(value);
        this._book = makeCopy(value);
    }

    @Output()
    bookUpdated = new EventEmitter<Book>();

    save() {
        if (this._book) {
            this.bookUpdated.emit({...this._book});
        }
    }

    revert() {
        this._book = makeCopy(this.originalValue);
    }
}
