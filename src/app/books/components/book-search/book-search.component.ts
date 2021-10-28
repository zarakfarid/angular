import {AfterViewInit, Component} from '@angular/core';
import {BooksService} from "../../services/books.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {debounceTime, distinctUntilChanged, filter, switchMap} from "rxjs/operators";
import {Book} from "../../model/book";

@Component({
    selector: 'app-book-search',
    templateUrl: './book-search.component.html',
    styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements AfterViewInit {

    books$: Observable<Book[]>;
    readonly formGroup: FormGroup;
    private readonly searchControl: FormControl;

    constructor(private readonly booksService: BooksService) {
        this.searchControl = new FormControl(null, [Validators.required, Validators.minLength(2)]);
        this.formGroup = new FormGroup({
            search: this.searchControl
        });

        this.books$ = this.searchControl.valueChanges
            .pipe(
                debounceTime(300),
                distinctUntilChanged(),
                switchMap(query => this.booksService.findBooks(query))
            );
    }

    ngAfterViewInit() {
        // this.searchControl.setValue("");
    }
}
