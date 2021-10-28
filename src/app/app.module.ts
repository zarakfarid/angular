import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BooksModule} from "./books/books.module";
import {StartPageModule} from "./start-page/start-page.module";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BooksModule,
        StartPageModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
