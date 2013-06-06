describe( "Namespace", function () {

    it( "exists.", function () {
        expect( namespace ).toBeTruthy();
    } );

    it( "is not an empty object.", function () {
        expect( namespace ).toNotBe( {} );
    } );

    it( "contains a \"book\" member of type \"function\".", function () {
        expect( typeof( namespace.book ) ).toBe( "function" );
    } );

    it( "contains a \"query\" member of type \"function\".", function () {
        expect( typeof( namespace.query ) ).toBe( "function" );
    } );

    it( "contains a \"data\" member of type \"object\".", function () {
        expect( typeof( namespace.data ) ).toBe( "object" );
    } );

});

describe( "Book function", function () {

    it( "returns an object with the expected title \"A Practitioner's Guide to Software Test Design\".", function () {
        expect( namespace.book( { title: "A Practitioner's Guide to Software Test Design" } ).title ).toBe( "A Practitioner's Guide to Software Test Design" );
    } );

    it( "does not return any object when it isn't supplied with any parameter.", function () {
        expect( namespace.book( ) ).toBe( undefined );
    } );

    it( "does not return any object when it isn't supplied with at least one valid parameter.", function () {
        expect( namespace.book( {} ) ).toBe( undefined );
    } )

} );

describe( "Data query", function () {

    it( "can find at least one book by the title \"Les Hauts de Hurle-Vent\".", function () {
        expect( namespace.query( { collection: namespace.data.books, filterBy: "title", filteredValue: "Les Hauts de Hurle-Vent" } ).results.length ).toBeGreaterThan( 0 );
    } );

    it( "can return something for an existing book found by its title.", function () {
        expect( namespace.query( { collection: namespace.data.books, filterBy: "title", filteredValue: "Wuthering Heights" } ).first() ).toBeTruthy();
    } );

    it( "can read title of the returned book first occurence.", function () {
        expect( namespace.query( { collection: namespace.data.books, filterBy: "title", filteredValue: "Wuthering Heights" } ).first().title ).toBe( "Wuthering Heights" );
    } );

    it( "does not find a book that doesn't exist.", function () {
        expect( namespace.query( { collection: namespace.data.books, filterBy: "title", filteredValue: "Book title that will not be found" } ).first() ).toBe( undefined );
    } );

    it( "finds a book and reads its title by filtering with its ISBN 10.", function () {
        expect( namespace.query( { collection: namespace.data.books, filterBy: "isbn10", filteredValue: "1853260010" } ).first().title ).toBe( "Wuthering Heights" );
    } );

} );















