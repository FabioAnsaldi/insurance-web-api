'use strict';

const logger = require("./logger");
const path = require("path");

const getHandler = (options) => {

    const {handle, handlers} = options;
    let result = {};

    handlers.forEach((obj, i) => {

        if (obj.identifier === handle) {

            result = obj;
        }
    });
    return result;
};

const mergeTemplates = (locals) => {

    locals.template.helper = Object.assign(
        {layout: locals.layout.name},
        locals.layout.helper
    );
};

const setRoutes = (locals, routes) => {

    routes.forEach((route, i) => {

        delete route.content;
        delete route.description;
    });
    locals.routes = routes;
};

const setTemplateMiddleware = (options) => {

    const {layout, template, description, title, content, path, routes} = options;

    return (req, res, next) => {
        if (!path || path === '') throw new Error('Path not set');
        else res.locals.path = path;
        if (!title) res.locals.title = '';
        else res.locals.title = title;
        if (!description) res.locals.description = '';
        else res.locals.description = description;
        if (!content) res.locals.content = '';
        else res.locals.content = content;
        if (!layout || layout === '') res.locals.layout = {name: 'main', helper: {}};
        else res.locals.layout = {name: layout, helper: require(`../views/layouts/${layout}`)(res)};
        if (!template || template === '') res.locals.template = {name: 'default', helper: {}};
        else res.locals.template = {name: template, helper: require(`../views/${template}`)(res)};
        setRoutes(res.locals, routes);
        mergeTemplates(res.locals);
        next();
    }
};

module.exports = (options) => {

    try {

        const {server, express, routes, handlers} = options;
        const {viewEngine} = JSON.parse(process.env.CONFIG);

        server.use('/assets', express.static(path.join(__dirname, '../../bower_components')));
        logger.environment.info(`GET method enabled for: bower_components/*`);
        server.use('/app', express.static(path.join(__dirname, '../app')));
        logger.environment.info(`GET method enabled for: app/*`);
        routes.forEach((route, i) => {

            let params = getHandler({handle: route.handle, handlers});
            let opt = {
                path: route.path,
                template: route.template,
                title: route.title,
                description: route.description,
                content: route.content,
                layout: viewEngine.defaultLayout,
                routes: routes
            };

            if (params.method.toLowerCase() === 'get') {

                server.get(route.path, setTemplateMiddleware(opt), params.handle);
                logger.environment.info(`${params.method.toUpperCase()} method enabled for: ${route.path}`);
            } else if (params.method.toLowerCase() === 'post') {

                server.post(route.path, setTemplateMiddleware(opt), params.handle);
                logger.environment.info(`${params.method.toUpperCase()} method enabled for: ${route.path}`);
            } else {

                logger.environment.info(`Missin method for: ${route.identifier}`);
            }
        });
        return true;
    } catch (e) {

        logger.environment.error(`routing error: ${e}`);
        return false;
    }
};
