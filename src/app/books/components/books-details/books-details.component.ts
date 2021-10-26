import { Component } from '@angular/core';
import {Book} from "../../model/book";

@Component({
  selector: 'app-books-details',
  templateUrl: './books-details.component.html',
  styleUrls: ['./books-details.component.scss']
})
export class BooksDetailsComponent {

  book: Book = {
    id: null,
    title: 'Solaris',
    author: 'Stanisław Lem',
    year: 1960
  };

  save() {
    console.log("Save clicked!");
  }

  revert() {
    console.log("Revert clicked!");
  }
}
