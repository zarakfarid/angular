import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StartPageComponent} from "./start-page/components/start-page/start-page.component";
import {BookListComponent} from "./books/components/book-list/book-list.component";
import {NoPageFoundComponent} from "./start-page/components/no-page-found/no-page-found.component";
import {BooksDetailsComponent} from "./books/components/books-details/books-details.component";
import {BookListResolver} from "./books/components/book-list/book-list.resolver";

const routes: Routes = [
  {
    path: "",
    component: StartPageComponent
  },
  {
    path: "books",
    component: BookListComponent,
    resolve: {
      books: BookListResolver
    }
  },
  {
    path: "books/edit",
    component: BooksDetailsComponent
  },
  {
    path: "**",
    component: NoPageFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
