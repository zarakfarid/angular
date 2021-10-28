import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Book} from "../../model/book";
import {FormControl, FormGroup, Validators} from "@angular/forms";

const makeCopy = (book: Book | null) => book ? {...book} : null;

@Component({
    selector: 'app-books-details',
    templateUrl: './books-details.component.html',
    styleUrls: ['./books-details.component.scss']
})
export class BooksDetailsComponent {

    _book: Book | null = null;

    formGroup: FormGroup;

    @Input()
    get book() {
        return this._book;
    }

    set book(value: Book | null) {
        this._book = makeCopy(value);
        this.updateFormControls();
    }

    @Output()
    bookUpdated = new EventEmitter<Book>();

    private titleControl = new FormControl("", [Validators.required]);
    private authorControl = new FormControl("", [Validators.required]);
    private yearControl = new FormControl(null, [Validators.required, Validators.min(1000), Validators.max(2022)]);

    constructor() {
        this.formGroup = new FormGroup({
            title: this.titleControl,
            author: this.authorControl,
            year: this.yearControl
        });
    }

    save(): void {
        if (this._book) {
            this.extractFormControls();
            this.bookUpdated.emit({...this._book});
        }
    }

    revert(): void {
        this.updateFormControls();
    }

    private updateFormControls(): void {
        this.titleControl.setValue(this._book?.title);
        this.authorControl.setValue(this._book?.author);
        this.yearControl.setValue(this._book?.year);
    }

    private extractFormControls(): void {
        if (this._book) {
            this._book.title = this.titleControl.value;
            this._book.author = this.authorControl.value;
            this._book.year = this.yearControl.value;
        }
    }
}
