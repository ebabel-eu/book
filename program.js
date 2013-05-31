/*jslint browser: true */
/*jslint todo: true */
var namespace = {}; // Replace the name "namespace" with your own namespace, i.e. domain name of your company for example, because it's unlikely to clash with someone else's library.

// Class library.
namespace.book = function (properties) {
    "use strict";
    var that = {};

    if (properties && properties.title) {
        that.title = properties.title;
    } else {
        namespace.log({ messages: [{ message: "Missing title.", messageType: "error" }] });
    }

    return that;
};

namespace.query = function (properties) {
    "use strict";
    var that = {};

    that.results = [];

    that.findResults = function (list, filterBy, filteredValue) {
        var results = [], i;

        for (i = 0; i < list.length; i += 1) {
            if (list[i] && list[i][filterBy] === filteredValue) {
                results.push(list[i]);
            }
        }

        return results;
    };

    // todo: first() has a dependency on findResults() - is that good quality code? Think about whether this should be refactored so that first can be called on its own.
    that.first = function () {
        var result = {}, i;

        if (!that.results || that.results.length === 0) {
            namespace.log({ messages: [{ message: "No data can be found.", messageType: "error" }] });
            return {};
        }

        for (i = 0; i < that.results.length; i += 1) {
            if (that.results[i]) {
                result = that.results[i];
            }
        }

        return result;
    };

    if (properties.collection && properties.filterBy && properties.filteredValue) {
        that.results = that.findResults(properties.collection, properties.filterBy, properties.filteredValue);
    } else {
        namespace.log({ messages: [{ message: "Missing one or several of these properties: list, filterBy and filteredValue.", messageType: "error" }] });
    }

    return that;
};

namespace.log = function (properties) {
    "use strict";
    var that = {};

    that.write = function (message, messageType) {

        if (!message) {
            message = "Message to log is missing.";
            messageType = "error";
        }

        if (!messageType) {
            messageType = "info"; // Default message type.
        }

        if (window.console) {
            window.console.log(messageType + ": " + message);
        } else {
            window.document.writeln("<p class=" + messageType + ">" + messageType + ": " + message + "</p>");
        }
    };

    if (!properties || !properties.messages) {
        that.write("Constructor has no messages to log.", "error");
    }

    if (properties && properties.messages) {
        properties.messages.forEach(function (messageObject) {
            that.write(messageObject.message, messageObject.messageType);
        });
    }

    return that;
};

// Data layer.
namespace.data = {
    books: [
        namespace.book({ title: "Wuthering Heights" }),
        namespace.book({ title: "Hauts des Hurlevents" }),
        namespace.book() // Error: this book has no title. This error is reported by the "Missing title" error message.
    ]
};

// todo: use Jasmine to test my code instead of logging messages with namespace.log()

// UI implementation.
namespace.log({
    messages: [
        { message: namespace.data.books[0].title, messageType: "info" },
        { message: namespace.data.books[2].title, messageType: "info" }, // Error: the anonymous book has no title. This error is reported by the "Message to log is missing" error message.
        { message: namespace.data.books[1].title, messageType: "info" },
        { message: "Message without a default message type." }
    ]
});
namespace.log(); // Error: there is no message to log. This error is reported by the "Constructor has no messages to log" error message.

// Query data that does exist.
namespace.log({
    messages: [
        { message: namespace.query({ collection: namespace.data.books, filterBy: "title", filteredValue: "Hauts des Hurlevents" }).results.length, messageType: "query" },
        { message: namespace.query({ collection: namespace.data.books, filterBy: "title", filteredValue: "Hauts des Hurlevents" }).first().title, messageType: "query" }
    ]
});

// Query data that doesn't exist.
namespace.log({
    messages: [
        { message: namespace.query({ collection: namespace.data.books, filterBy: "title", filteredValue: "Book title that will not be found" }).first().title, messageType: "query" } // this also triggers a "no message to log" type of error because title is undefined since first returned an empty object.
    ]
});
