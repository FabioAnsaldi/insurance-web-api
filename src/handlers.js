module.exports = [
    {
        identifier: 'simpleView',
        method: 'GET',
        handle: (req, res) => {

            res.render(res.locals.template, {

                layout: res.locals.layout,
                title: res.locals.title,
                description: res.locals.description,
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
            });
        }
    }
];