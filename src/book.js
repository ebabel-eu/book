/*jslint browser: true */
/*jslint todo: true */
var namespace = {};

namespace.error = function (properties) {
    "use strict";
    var that = { errors: [] }, getMessage;

    if (!properties) {
        that.errors.push(namespace.error({ code: 1 }));
        return that;
    }

    that.code = properties.code || 2;

    getMessage = function (code) {
        var error = namespace.query({ collection: namespace.data.errors, filterBy: "code", filteredValue: code }).first();

        return error ? error.message : namespace.query({ collection: namespace.data.errors, filterBy: "code", filteredValue: 6 }).first().message;
    };

    that.message = getMessage(that.code);

    return that;
};

namespace.book = function (properties) {
    "use strict";
    var that = { errors: [] };

    if (!properties) {
        that.errors.push(namespace.error({ code: 1 }));
        return that;
    }

    if (!properties.title && !properties.isbn10 && !properties.isbn13 && !properties.cultureCode) {
        that.errors.push(namespace.error({ code: 3 }));
        return that;
    }

    if (properties.title) {
        that.title = properties.title;
    }

    if (properties.isbn10) {
        that.isbn10 = properties.isbn10;
    }

    if (properties.isbn13) {
        that.isbn13 = properties.isbn13;
    }

    if (properties.cultureCode) {
        that.cultureCode = properties.cultureCode;
    }

    return that;
};

namespace.query = function (properties) {
    "use strict";
    var that = { errors: [] }, findResults;

    that.results = [];

    findResults = function (list, filterBy, filteredValue) {
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

        if (!that.results || that.results.length === 0) {
            that.errors.push(namespace.error({ code: 4 }));
        } else {
            for (i = 0; i < that.results.length; i += 1) {
                if (that.results[i]) {
                    result = that.results[i];
                }
            }
        }

        return result;
    };

    if (properties.collection && properties.filterBy && properties.filteredValue) {
        that.results = findResults(properties.collection, properties.filterBy, properties.filteredValue);
    } else {
        that.errors.push(namespace.error({ code: 5 }));
    }

    return that;
};

namespace.data = {
    books: [
        namespace.book({ title: "Wuthering Heights", isbn10: "1853260010", isbn13: "978-1853260018", cultureCode: "en-GB" }),
        namespace.book({ title: "Les Hauts de Hurle-Vent", isbn10: "2211204252", isbn13: "978-2211204255", cultureCode: "fr-FR" })
    ],
    errors: [
        { code: 1, message: "No properties." },
        { code: 2, message: "Missing error code." },
        { code: 3, message: "At least one property member is required." },
        { code: 4, message: "No data can be found." },
        { code: 5, message: "A required property member is missing." },
        { code: 6, message: "Unexpected error code." }
    ]
};