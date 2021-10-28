import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {BooksService} from "../../services/books.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Observable, Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {Book} from "../../model/book";

@Component({
    selector: 'app-book-search',
    templateUrl: './book-search.component.html',
    styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnDestroy, AfterViewInit {

    books$: Observable<Book[]> | null = null;
    readonly formGroup: FormGroup;
    private readonly searchControl: FormControl;
    private readonly unsubscribe = new Subject();

    constructor(private readonly booksService: BooksService) {
        this.searchControl = new FormControl("");
        this.formGroup = new FormGroup({
            search: this.searchControl
        });

        this.searchControl.valueChanges
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(query => {
                console.log(query);
                this.books$ = this.booksService.findBooks(query);
            });

    }

    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    ngAfterViewInit() {
        setTimeout(() => this.books$ = this.booksService.getAllBooks());
    }
}
