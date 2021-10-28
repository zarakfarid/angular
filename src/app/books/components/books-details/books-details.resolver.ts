import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Book} from "../../model/book";
import {Observable, of} from "rxjs";
import {Injectable} from "@angular/core";
import {BooksService} from "../../services/books.service";

@Injectable()
export class BooksDetailsResolver implements Resolve<Book | undefined> {

    constructor(private readonly booksService: BooksService) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<Book | undefined> {
        const bookIdAsString = route.paramMap.get("bookId");
        if(bookIdAsString) {
            const bookId: number = parseInt(bookIdAsString, 10);
            if (!isNaN(bookId)) {
                return this.booksService.getBook(bookId);
            }
        }
        return of(undefined);
    }
}
