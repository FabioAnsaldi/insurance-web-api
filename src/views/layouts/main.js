'use strict';

module.exports = (res) => {

    return {

        title: res.locals.title,
        description: res.locals.description,
        helpers: {

            echoNav: () => {

                let links = '';

                res.locals.routes.forEach((route, i) => {

                    let _class = '';

                    if (res.locals.path === route.path) _class = 'active';
                    links += `<li class="nav-item ${_class}">`;
                    links += `<a class="nav-link" href="${route.path}" title="${route.title}">${route.title}</a>`;
                    links += '</li>';
                });
                return links;
            },
            requireModule: () => {

                let tag = '<script>';

                tag += "requirejs(['./app/common'], function (common) { requirejs(['app/main']); });";
                tag += '</script>';
                return tag;
            }
        }
    }
};