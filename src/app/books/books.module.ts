import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BooksDetailsComponent} from './components/books-details/books-details.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BookListComponent} from './components/book-list/book-list.component';
import {BooksService} from "./services/books.service";
import {BookListResolver} from "./components/book-list/book-list.resolver";


@NgModule({
    declarations: [
        BooksDetailsComponent,
        BookListComponent
    ],
    imports: [
        CommonModule, FormsModule, ReactiveFormsModule
    ],
    exports: [
        BooksDetailsComponent,
        BookListComponent
    ],
    providers: [BooksService, BookListResolver]
})
export class BooksModule {
}
