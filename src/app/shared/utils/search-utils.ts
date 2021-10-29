import {Book} from "../../books/model/book";

export const compare = (left: string, right: string) => {
    return left.toUpperCase().indexOf(right.toUpperCase()) >= 0;
};

export const searchFn = (query: string) => {
    return (book: Book) => compare(book.title, query) || compare(book.author, query);
};
