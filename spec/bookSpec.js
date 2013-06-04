describe("Namespace", function () {

    it("exists.", function () {
        expect(namespace).toBeTruthy();
    });

});

describe("Book object", function () {

    it("returns the expected title \"A Practitioner's Guide to Software Test Design\".", function () {
        expect(namespace.book({ title: "A Practitioner's Guide to Software Test Design" }).title).toEqual("A Practitioner's Guide to Software Test Design");
    });

    it("does not return a title property when it isn't supplied a title parameter.", function () {
        expect(namespace.book({}).title).toBeFalsey;
    });

});