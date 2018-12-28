'use strict';

module.exports = [
    {
        identifier: 'simpleView',
        method: 'GET',
        handle: (req, res) => {

            res.render(res.locals.template.name, res.locals.template.helper);
        }
    }
];