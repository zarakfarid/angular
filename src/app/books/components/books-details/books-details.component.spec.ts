import {BooksDetailsComponent} from './books-details.component';
import {Book} from "../../model/book";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

describe('BooksDetailsComponent', () => {

    let component: BooksDetailsComponent;
    let aBook: Book;

    beforeEach(() => {
        aBook = {
            id: null,
            title: "Solaris",
            author: "Stanisław Lem",
            year: 1960
        };
    });

    describe("[class]", () => {

        let unsubscribe: Subject<any> | null;

        beforeEach(() => {
            component = new BooksDetailsComponent();
            unsubscribe = new Subject<any>();
        });

        afterEach(() => {
            if(unsubscribe) {
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
            let modifiedBook: Book | null = null;
            component.bookUpdated
                .pipe(takeUntil(unsubscribe!))
                .subscribe(value => modifiedBook = value);
            // when
            component.formGroup.controls.title.setValue("Ubik");
            component.save();
            // then
            expect(modifiedBook).not.toBeNull();
            expect(modifiedBook!).not.toEqual(aBook);
            // when
            component.revert();
            component.save();
            // then
            expect(modifiedBook!).toEqual(aBook);
        });

        it("emits the current value when save is clicked", () => {
            component.book = aBook;
            const newTitle = "Ubik";
            const newAuthor = "Phillip K Dick";
            component.formGroup.controls.title.setValue(newTitle);
            component.formGroup.controls.author.setValue(newAuthor);
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

    describe("[DOM]", () => {

        let fixture: ComponentFixture<BooksDetailsComponent>;
        let nativeElement: HTMLElement;

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
                imports: [CommonModule, FormsModule]
            }).compileComponents();
        });

        beforeEach(() => {
            fixture = TestBed.createComponent(BooksDetailsComponent);
            component = fixture.componentInstance;
            nativeElement = fixture.nativeElement;
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

        it("once the book is edited, its value is propagated ti the model", () => {
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

            expect(component.book.title).toBe(newValues.title);
            expect(component.book.author).toBe(newValues.author);
            expect(component.book.year).toBe(newValues.year);
        });

        it("once save button is clicked, data is emitted", () => {
            component.book = aBook;
            fixture.detectChanges();

            let bookReceived: Book | null = null;
            component.bookUpdated.subscribe((value) => {
                bookReceived = value;
            });

            const newValues = {
                author: "Phillip K Dick",
                title: "Ubik",
                year: 1970
            };

            editInput(getTitleInput(), newValues.title);
            editInput(getAuthorInput(), newValues.author);
            editInput(getYearInput(), `${newValues.year}`);

            expect(bookReceived).toBeNull();

            clickSave();
            expect(bookReceived).not.toBeNull();
        });
    });
});
