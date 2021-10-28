import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StartPageComponent} from "./start-page/components/start-page/start-page.component";
import {BookListComponent} from "./books/components/book-list/book-list.component";
import {NoPageFoundComponent} from "./start-page/components/no-page-found/no-page-found.component";

const routes: Routes = [
  {
    path: "",
    component: StartPageComponent
  },
  {
    path: "books",
    component: BookListComponent
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
