describe( "Namespace", function () {

    it( "should exist.", function () {
        expect( namespace ).toBeDefined();
    } );

    it( "should no longer be its initial default value.", function () {
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

    it( "should returns an object with the expected title \"A Practitioner's Guide to Software Test Design\".", function () {
        expect( namespace.book( { title: "A Practitioner's Guide to Software Test Design" } ).title ).toBe( "A Practitioner's Guide to Software Test Design" );
    } );

    it( "should not return any object when it isn't supplied with any parameter.", function () {
        expect( namespace.book( ) ).toBe( undefined );
    } );

    it( "should not return any object if it isn't supplied with at least one valid parameter.", function () {
        expect( namespace.book( {} ) ).toBe( undefined );
    } )

} );

describe( "Data query", function () {

    it( "should find at least one book by the title \"Les Hauts de Hurle-Vent\".", function () {
        expect( namespace.query( { collection: namespace.data.books, filterBy: "title", filteredValue: "Les Hauts de Hurle-Vent" } ).results.length ).toBeGreaterThan( 0 );
    } );

    it( "should return something for an existing book found by its title.", function () {
        expect( namespace.query( { collection: namespace.data.books, filterBy: "title", filteredValue: "Wuthering Heights" } ).first() ).toBeTruthy();
    } );

    it( "should return the expected title \"Wuthering Heights\" for a book found by the ISBN 10 \"1853260010\".", function () {
        expect(namespace.query( { collection: namespace.data.books, filterBy: "isbn10", filteredValue: "1853260010" } ).first().title ).toBe( "Wuthering Heights" );
    } );

    it( "should not find a book that doesn't exist.", function () {
        expect( namespace.query( { collection: namespace.data.books, filterBy: "title", filteredValue: "Book title that will not be found" } ).first() ).toBe( undefined );
    } );

    it( "should return a results with 0 members when looking for a book that doesn't exist.", function () {
        expect( namespace.query( { collection: namespace.data.books, filterBy: "title", filteredValue: "Book title that will not be found" } ).results.length ).toBe( 0 );
    } );

} );















