import { BooksDetailsComponent } from './books-details.component';
import {Book} from "../../model/book";

fdescribe('BooksDetailsComponent', () => {

  describe("[class]", () => {

    let component: BooksDetailsComponent;
    let aBook: Book;

    beforeEach(() => {
      component = new BooksDetailsComponent();
      aBook = {
        id: null,
        title: "Solaris",
        author: "Stanisław Lem",
        year: 1960
      };
    });

    it("intially contains no book", () => {
      expect(component.book).toBeNull();
    });

    it("allows to set a book", () => {
      component.book = aBook;
      expect(component.book).toEqual(aBook);
    });

    it("makes a copy of an original book object", () => {
      component.book = aBook;
      expect(component.book).not.toBe(aBook);
    });

    it("allows to modify the book inside", () => {
      component.book = aBook;
      component.book.title = "Ubik";
      expect(component.book).not.toEqual(aBook);
      expect(component.book).toEqual({...aBook, title: "Ubik"});
    });

    it("allows to revert modified book to the original value", () => {
      // given
      component.book = aBook;
      // when
      component.book.title = "Ubik";
      // then
      expect(component.book).not.toEqual(aBook);
      // when
      component.revert();
      // then
      expect(component.book).toEqual(aBook);
    });

    it("emits the current value when save is clicked", () => {
      component.book = aBook;
      const newTitle = "Ubik";
      const newAuthor = "Phillip K Dick";
      component.book.title = newTitle;
      component.book.author = newAuthor;
      let bookUpdated: Book | null = null;
      component.bookUpdated.subscribe(value => {
        bookUpdated = value;
      });
      // when
      component.save();
      // then
      expect(bookUpdated).not.toBeNull();
      expect(bookUpdated!).toEqual({...aBook, title: newTitle, author: newAuthor});
    });
  });
});
