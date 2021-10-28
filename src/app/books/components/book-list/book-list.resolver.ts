import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Book} from "../../model/book";
import {Observable} from "rxjs";
import {BooksService} from "../../services/books.service";
import {Injectable} from "@angular/core";
import {take} from "rxjs/operators";

@Injectable()
export class BookListResolver implements Resolve<Book[]> {

    constructor(private readonly booksService: BooksService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Book[]> {
        return this.booksService.getAllBooks().pipe(take(1));
    }
}
