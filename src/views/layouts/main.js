'use strict';

module.exports = (res) => {

    return {

        title: res.locals.title,
        description: res.locals.description
    }
};