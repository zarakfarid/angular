import {Injectable} from '@angular/core';
import {Book} from "../model/book";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";


const API_PREFIX = "/api/books";

@Injectable()
export class BooksService {

    constructor(private readonly httpClient: HttpClient) {
    }

    getAllBooks(): Observable<Book[]> {
        return this.httpClient.get<Book[]>(API_PREFIX);
    }

    findBooks(query: string): Observable<Book[]> {
        return this.httpClient.get<Book[]>(`${API_PREFIX}?q=${query}`);
    }

    getBook(id: number): Observable<Book | undefined> {
        return this.httpClient.get<Book | undefined>(`${API_PREFIX}/${id}`);
    }

    updateBook(book: Book): Observable<Book> {
        if (book.id !== null) {
            return this.httpClient.put<Book>(`${API_PREFIX}/${book.id}`, book);
        } else {
            throw Error("Book does not have an id.");
        }
    }
}
