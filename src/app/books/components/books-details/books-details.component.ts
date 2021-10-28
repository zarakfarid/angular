import {Component} from '@angular/core';
import {Book} from "../../model/book";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {BooksService} from "../../services/books.service";

const makeCopy = (book: Book | null) => book ? {...book} : null;

@Component({
    selector: 'app-books-details',
    templateUrl: './books-details.component.html',
    styleUrls: ['./books-details.component.scss']
})
export class BooksDetailsComponent {

    _book: Book | null = null;

    formGroup: FormGroup;

    get book() {
        return this._book;
    }

    set book(value: Book | null) {
        this._book = makeCopy(value);
        this.updateFormControls();
    }

    private titleControl = new FormControl("", [Validators.required]);
    private authorControl = new FormControl("", [Validators.required]);
    private yearControl = new FormControl(null, [Validators.required, Validators.min(1000), Validators.max(2022)]);

    constructor(
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private readonly booksService: BooksService
    ) {
        this.formGroup = new FormGroup({
            title: this.titleControl,
            author: this.authorControl,
            year: this.yearControl
        });

        const state = this.router.getCurrentNavigation()?.extras.state;
        if (state) {
            this.book = state as Book;
        } else {
            this.goBack();
        }
    }

    save(): void {
        const newValue = this.extractFormControls();
        if (newValue) {
            this.booksService.updateBook(newValue);
            this.goBack();
        }
    }

    revert(): void {
        this.updateFormControls();
    }

    private goBack() {
        setTimeout(() => this.router.navigate([".."], {relativeTo: this.route}));
    }

    private updateFormControls(): void {
        this.titleControl.setValue(this._book?.title);
        this.authorControl.setValue(this._book?.author);
        this.yearControl.setValue(this._book?.year);
    }

    private extractFormControls(): Book | null {
        if (this._book) {
            return {
                ...this._book,
                title: this.titleControl.value,
                author: this.authorControl.value,
                year: this.yearControl.value
            }
        } else {
            return null;
        }
    }
}
