'use strict';

module.exports = (res) => {

    return {

        title: res.locals.title,
        content: res.locals.content,
        helpers: {

            echoNav: () => {

                let links = '';
                res.locals.routes.forEach((route, i) => {

                    links += `<a href="${route.path}" title="${route.title}">${route.title}</a>`;
                });
                return links;
            }
        }
    }
};