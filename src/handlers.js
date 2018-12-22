module.exports = [
    {
        identifier: 'simpleView',
        method: 'GET',
        handle: (req, res) => {

            res.render(res.locals.template, {layout: res.locals.layout});
        }
    }
];