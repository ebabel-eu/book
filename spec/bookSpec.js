describe( "Namespace", function () {

    it( "should exist.", function () {
        expect( namespace ).toBeDefined();
    } );

    it( "should no longer be set to its initial value.", function () {
        expect( namespace ).toNotBe( {} );
    } );

    it( "should contain a \"book\" member of type \"function\".", function () {
        expect( typeof( namespace.book ) ).toBe( "function" );
    } );

    it( "should contain a \"query\" member of type \"function\".", function () {
        expect( typeof( namespace.query ) ).toBe( "function" );
    } );

    it( "should contain a \"data\" member of type \"object\".", function () {
        expect( typeof( namespace.data ) ).toBe( "object" );
    } );

});

describe( "Book function", function () {

    it( "should return an object with the expected title \"A Practitioner's Guide to Software Test Design\".", function () {
        expect( namespace.book( { title: "A Practitioner's Guide to Software Test Design" } ).title ).toBe( "A Practitioner's Guide to Software Test Design" );
    } );

    it( "should return at least one error when it isn't supplied with any parameter.", function () {
        expect( namespace.book().errors.length ).toBeGreaterThan( 0 );
    } );

    it( "should return at least one error when it isn't supplied with at least one valid parameter.", function () {
        expect( namespace.book( {} ).errors.length ).toBeGreaterThan( 0 );
    } );

    it( "should return at least one error when it is supplied with an unexpected parameter but no valid parameter.", function () {
        expect( namespace.book( { unexpectedParameter: "Unexpected value." } ).errors.length ).toBeGreaterThan( 0 );
    } );

} );

describe( "Data query", function () {

    it( "should find at least one book by the title \"Les Hauts de Hurle-Vent\".", function () {
        expect( namespace.query( { collection: namespace.data.books, filterBy: "title", filteredValue: "Les Hauts de Hurle-Vent" } ).results.length ).toBeGreaterThan( 0 );
    } );

    it( "should return something for an existing book found by its title.", function () {
        expect( namespace.query( { collection: namespace.data.books, filterBy: "title", filteredValue: "Wuthering Heights" } ).first() ).toBeTruthy();
    } );

    it( "should be able to read the title of a returned book first occurence.", function () {
        expect( namespace.query( { collection: namespace.data.books, filterBy: "title", filteredValue: "Wuthering Heights" } ).first().title ).toBe( "Wuthering Heights" );
    } );

    it( "should not find a book that doesn't exist.", function () {
        expect( namespace.query( { collection: namespace.data.books, filterBy: "title", filteredValue: "Book title that will not be found" } ).first() ).toBe( undefined );
    } );

    it( "should find a book and reads its title by filtering with its ISBN 10.", function () {
        expect( namespace.query( { collection: namespace.data.books, filterBy: "isbn10", filteredValue: "1853260010" } ).first().title ).toBe( "Wuthering Heights" );
    } );

    it( "should return at least one book written in British English.", function () {
        expect( namespace.query( { collection: namespace.data.books, filterBy: "cultureCode", filteredValue: "en-GB" } ).results.length ).toBeGreaterThan( 0 );
    } );

} );















