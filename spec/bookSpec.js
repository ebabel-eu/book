describe("Namespace", function () {

    it("exists.", function () {
        expect(namespace).toBeTruthy();
    });

    it("is not an empty object.", function () {
        expect(namespace).toNotBe({});
    });

    it("contains a \"book\" of type \"function\".", function () {
        expect(typeof(namespace.book)).toBe("function");
    });

});

describe("Book function", function () {

    it("returns the expected title \"A Practitioner's Guide to Software Test Design\".", function () {
        expect(namespace.book({ title: "A Practitioner's Guide to Software Test Design" }).title).toBe("A Practitioner's Guide to Software Test Design");
    });

    it("does not return a title property when it isn't supplied a title parameter.", function () {
        expect(namespace.book({}).title).toBeFalsy();
    });

});

describe("Data query", function () {

    it("can find at least one book by the title \"Hauts des Hurlevents\".", function () {
        expect(namespace.query({ collection: namespace.data.books, filterBy: "title", filteredValue: "Hauts des Hurlevents" }).results.length).toBeGreaterThan(0);
    });

    it("can return something for an existing book found by its title.", function () {
        expect(namespace.query({ collection: namespace.data.books, filterBy: "title", filteredValue: "Wuthering Heights" }).first()).toBeTruthy();
    });

    it("can read title of the returned book first occurence.", function () {
        expect(namespace.query({ collection: namespace.data.books, filterBy: "title", filteredValue: "Wuthering Heights" }).first().title).toBe("Wuthering Heights");
    });

    it("does not find a book that doesn't exist.", function () {
        expect(namespace.query({ collection: namespace.data.books, filterBy: "title", filteredValue: "Book title that will not be found" }).first()).toBe(undefined);
    });

});