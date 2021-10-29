import {BooksDetailsComponent} from './books-details.component';
import {Book} from "../../model/book";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {of, Subject} from "rxjs";
import {RouterTestingModule} from "@angular/router/testing";
import {BooksService} from "../../services/books.service";

describe('BooksDetailsComponent', () => {

    let component: BooksDetailsComponent;
    let aBook: Book;

    beforeEach(() => {
        aBook = {
            id: 1,
            title: "Solaris",
            author: "Stanisław Lem",
            year: 1960
        };
    });

    describe("[class]", () => {

        let unsubscribe: Subject<any> | null;
        let booksServiceMock: any;
        let routerMock: any;
        let routeMock: any;

        beforeEach(() => {
            booksServiceMock = {
                updateBook: jasmine.createSpy().and.returnValue(of(aBook))
            };
            routerMock = {
                navigate: jasmine.createSpy()
            };
            routeMock = {
                snapshot: {
                    data: {
                        book: null
                    }
                }
            };

            component = new BooksDetailsComponent(routerMock, routeMock, booksServiceMock);
            unsubscribe = new Subject<any>();
        });

        afterEach(() => {
            if (unsubscribe) {
                unsubscribe.next();
                unsubscribe.complete();
            }
            unsubscribe = null;
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
            component.formGroup.controls.title.setValue("Ubik");
            component.save();
            // then
            expect(booksServiceMock.updateBook).toHaveBeenCalledWith({...aBook, title: "Ubik"});
            // when
            component.revert();
            component.save();
            // then
            expect(booksServiceMock.updateBook).toHaveBeenCalledWith(aBook);
        });

        it("emits the current value when save is clicked", () => {
            component.book = aBook;
            const newTitle = "Ubik";
            const newAuthor = "Phillip K Dick";
            component.formGroup.controls.title.setValue(newTitle);
            component.formGroup.controls.author.setValue(newAuthor);
            // when
            component.save();
            // then
            expect(booksServiceMock.updateBook).toHaveBeenCalledOnceWith({...aBook, title: newTitle, author: newAuthor});
        });
    });

    describe("[DOM]", () => {

        let fixture: ComponentFixture<BooksDetailsComponent>;
        let nativeElement: HTMLElement;
        let bookService: BooksService;

        const getHTMLInput = (selector: string) => (nativeElement.querySelector(selector) as HTMLInputElement);
        const getTitleInput = () => getHTMLInput("#title");
        const getAuthorInput = () => getHTMLInput("#author");
        const getYearInput = () => getHTMLInput("#year");
        const editInput = (element: HTMLInputElement, value: string) => {
            element.value = value;
            element.dispatchEvent(new Event("input"));
        }
        const clickSave = () => {
            nativeElement.querySelector("button.app-save-button")?.dispatchEvent(new Event("click"));
        }

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                declarations: [BooksDetailsComponent],
                imports: [CommonModule, ReactiveFormsModule, RouterTestingModule],
                providers: [BooksService]
            }).compileComponents();
        });

        beforeEach(() => {
            fixture = TestBed.createComponent(BooksDetailsComponent);
            component = fixture.componentInstance;
            nativeElement = fixture.nativeElement;
            bookService = TestBed.inject(BooksService);
            fixture.detectChanges();
        });

        it("for no book we don't see a form, but rather a message", () => {
            expect(nativeElement.querySelector("p")?.innerText).toBe("Please select a book.");
        });

        it("once the book is selected, we see a form", async () => {
            component.book = aBook;
            fixture.detectChanges();
            expect(nativeElement.querySelector("p")).toBeFalsy();
            expect(nativeElement.querySelector("h2")).toBeTruthy();
            expect(nativeElement.querySelector("h2")?.innerText).toBe("Book details");
            await fixture.whenStable(); // return fixture.whenStable(() => { ...
            expect(getTitleInput().value).toBe(aBook.title);
            expect(getAuthorInput().value).toBe(aBook.author);
            expect(getYearInput().value).toBe(aBook.year.toString());
            // ... });
        });

        it("once save button is clicked, data is emitted", (done) => {
            component.book = aBook;
            fixture.detectChanges();

            const newValues = {
                author: "Phillip K Dick",
                title: "Ubik",
                year: 1970
            };

            editInput(getTitleInput(), newValues.title);
            editInput(getAuthorInput(), newValues.author);
            editInput(getYearInput(), `${newValues.year}`);

            clickSave();

            bookService.getBook(1).subscribe(modifiedBook => {
                expect(modifiedBook).not.toBeNull();
                expect(modifiedBook!).toEqual({...aBook, ...newValues});
                done();
            });
        });
    });
});
