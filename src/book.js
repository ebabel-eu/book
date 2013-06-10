/*jslint browser: true */
/*jslint todo: true */
var namespace = {}; // Replace the name "namespace" with your own namespace, i.e. domain name of your company for example, because it's unlikely to clash with someone else's library.

// Class library.
namespace.book = function ( properties ) {
    "use strict";
    var that = { errors: [] };

    if ( !properties ) {
        that.errors.push( namespace.error( { code: 1 } ) );
        return that;
    }

    if ( !properties.title && !properties.isbn10 && !properties.isbn13 && !properties.cultureCode ) {
        that.errors.push( namespace.error( { code: 3 } ) );
    }

    if ( properties.title ) {
        that.title = properties.title;
    }

    if ( properties.isbn10 ) {
        that.isbn10 = properties.isbn10;
    }

    if ( properties.isbn13 ) {
        that.isbn13 = properties.isbn13;
    }

    if ( properties.cultureCode ) {
        that.cultureCode = properties.cultureCode;
    }

    return that;
};

namespace.error = function ( properties ) {
    "use strict";
    var that = { errors: [] }, getMessage;

    if ( !properties ) {
        that.errors.push( namespace.error( { code: 1 } ) );
        return that;
    }

    that.code = ( properties.code ) ? properties.code : 2;

    getMessage = function ( code ) {
        if ( code === 1 ) { return "No properties."; }
        if ( code === 2 ) { return "Missing error code."; }
        if ( code === 3 ) { return "At least one property member is required."; }

        return "Unexpected error code.";
    };

    that.message = getMessage( that.code );

    return that;
};

namespace.query = function ( properties ) {
    "use strict";
    var that = {}, findResults;

    that.results = [];

    findResults = function ( list, filterBy, filteredValue ) {
        var results = [], i;

        for ( i = 0; i < list.length; i += 1 ) {
            if ( list[ i ] && list[ i ][ filterBy ] === filteredValue ) {
                results.push( list[ i ] );
            }
        }

        return results;
    };

    that.first = function () {
        var result, i;

        // todo: first() has a dependency on findResults() - is that good quality code? Should it be possible for first() to be called by itself?
        if ( !that.results || that.results.length === 0 ) {
            namespace.log( { messages: [ { message: "No data can be found.", messageType: "error" } ] } );
            return undefined;
        }

        for ( i = 0; i < that.results.length; i += 1 ) {
            if ( that.results[ i ] ) {
                result = that.results[ i ];
            }
        }

        return result;
    };

    if ( properties.collection && properties.filterBy && properties.filteredValue ) {
        that.results = findResults( properties.collection, properties.filterBy, properties.filteredValue );
    } else {
        namespace.log( { messages: [ { message: "Missing one or several of these properties: list, filterBy and filteredValue.", messageType: "error" } ] } );
    }

    return that;
};

// Data layer.
namespace.data = {
    books: [
        namespace.book( { title: "Wuthering Heights", isbn10: "1853260010", isbn13: "978-1853260018", cultureCode: "en-GB" } ),
        namespace.book( { title: "Les Hauts de Hurle-Vent", isbn10: "2211204252", isbn13: "978-2211204255", cultureCode: "fr-FR" } )
    ]
};

// Presentation layer.
// todo: consider logging to an ajax call and a database instead of outputting to the client console.
namespace.log = function ( properties ) {
    "use strict";
    var that = {}, write;

    write = function ( message, messageType ) {

        if ( !message ) {
            message = "Message to log is missing.";
            messageType = "error";
        }

        if ( !messageType ) {
            messageType = "info"; // Default message type.
        }

        if ( window.console ) {
            window.console.log( messageType + ": " + message );
        } else {
            window.document.writeln( "<p class=" + messageType + ">" + messageType + ": " + message + "</p>" );
        }
    };

    if ( !properties || !properties.messages ) {
        write( "Constructor has no messages to log.", "error" );
    }

    if ( properties && properties.messages ) {
        properties.messages.forEach( function ( messageObject ) {
            write( messageObject.message, messageObject.messageType );
        } );
    }

    return that;
};