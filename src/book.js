/*jslint browser: true */
/*jslint todo: true */
var namespace = {}; // Replace the name "namespace" with your own namespace, i.e. domain name of your company for example, because it's unlikely to clash with someone else's library.

// Class library.
namespace.book = function (properties) {
    "use strict";
    var that = {};

    if (properties && properties.title) {
        that.title = properties.title;
    }

    return that;
};

namespace.query = function (properties) {
    "use strict";
    var that = {};

    that.results = [];

    // todo: consider making findResults private with a var instead of the public that.findResults.
    that.findResults = function (list, filterBy, filteredValue) {
        var results = [], i;

        for (i = 0; i < list.length; i += 1) {
            if (list[i] && list[i][filterBy] === filteredValue) {
                results.push(list[i]);
            }
        }

        return results;
    };

    that.first = function () {
        var result, i;

        // todo: first() has a dependency on findResults() - is that good quality code? Think about whether this should be refactored so that first can be called on its own.
        if (!that.results || that.results.length === 0) {
            namespace.log({ messages: [{ message: "No data can be found.", messageType: "error" }] });
            return undefined;
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

// Data layer.
namespace.data = {
    books: [
        namespace.book({ title: "Wuthering Heights" }),
        namespace.book({ title: "Hauts des Hurlevents" }),
        namespace.book() // Error: this book has no title. This error is reported by the "Missing title" error message.
    ]
};

// Presentation layer.
// todo: consider logging to an ajax call and a database instead of outputting to the client console.
namespace.log = function (properties) {
    "use strict";
    var that = {};

    var write = function (message, messageType) {

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
        write("Constructor has no messages to log.", "error");
    }

    if (properties && properties.messages) {
        properties.messages.forEach(function (messageObject) {
            write(messageObject.message, messageObject.messageType);
        });
    }

    return that;
};
