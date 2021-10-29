import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Book} from "../../model/book";

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent {

  @Input()
  book: Book | null = null;

  @Input()
  showSelectLink = true;

  @Output()
  bookSelected = new EventEmitter<Book>();
}
