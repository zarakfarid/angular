import {Injectable} from '@angular/core';
import {Book} from "../model/book";
import {SpinnerService} from "../../shared/services/spinner.service";
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";

const PATH_PREFIX = "/api";

@Injectable()
export class BooksService {

    constructor(private readonly spinnerService: SpinnerService, private readonly httpClient: HttpClient) {
    }

    getAllBooks(): Observable<Book[]> {
        return this.httpClient.get<Book[]>(`${PATH_PREFIX}/books`);
    }

    findBooks(query: string): Observable<Book[]> {
        return this.httpClient.get<Book[]>(`${PATH_PREFIX}/books?q=${query}`);
    }

    getBook(id: number): Observable<Book | undefined> {
        return this.httpClient.get<Book | undefined>(`${PATH_PREFIX}/books/${id}`);
    }

    updateBook(book: Book): Observable<Book> {
        return this.httpClient.put<Book>(`${PATH_PREFIX}/books/${book.id}`, book);
    }
}
