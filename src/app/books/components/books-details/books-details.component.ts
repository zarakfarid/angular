import {Component, Input} from '@angular/core';
import {Book} from "../../model/book";

@Component({
  selector: 'app-books-details',
  templateUrl: './books-details.component.html',
  styleUrls: ['./books-details.component.scss']
})
export class BooksDetailsComponent {

  @Input()
  book: Book | null = null;

  save() {
    console.log("Save clicked!");
  }

  revert() {
    console.log("Revert clicked!");
  }
}
