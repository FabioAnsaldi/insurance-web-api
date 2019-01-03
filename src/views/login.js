'use strict';

module.exports = (res) => {

    return {

        title: res.locals.title,
        content: res.locals.content,
        helpers: {

        }
    }
};