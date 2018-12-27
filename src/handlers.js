module.exports = [
    {
        identifier: 'simpleView',
        method: 'GET',
        handle: (req, res) => {

            res.render(res.locals.template, {

                layout: res.locals.layout,
                title: res.locals.title,
                description: res.locals.description,
                helpers: {

                    echo: (msg) => {

                        return (msg);
                    }
                }
            });
        }
    }
];