import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksDetailsComponent } from './components/books-details/books-details.component';
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    BooksDetailsComponent
  ],
  imports: [
    CommonModule, FormsModule
  ],
  exports: [
      BooksDetailsComponent
  ]
})
export class BooksModule { }
