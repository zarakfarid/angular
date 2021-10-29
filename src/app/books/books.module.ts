import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BooksDetailsComponent} from './components/books-details/books-details.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BookListComponent} from './components/book-list/book-list.component';
import {BooksService} from "./services/books.service";
import {BookListResolver} from "./components/book-list/book-list.resolver";
import {BooksDetailsResolver} from "./components/books-details/books-details.resolver";
import {BookSearchComponent} from './components/book-search/book-search.component';
import {HttpClientModule} from "@angular/common/http";
import { BookCardComponent } from './components/book-card/book-card.component';


@NgModule({
    declarations: [
        BooksDetailsComponent,
        BookListComponent,
        BookSearchComponent,
        BookCardComponent
    ],
    imports: [
        CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule
    ],
    exports: [
        BooksDetailsComponent,
        BookListComponent,
        BookSearchComponent
    ],
    providers: [BooksService, BookListResolver, BooksDetailsResolver]
})
export class BooksModule {
}
