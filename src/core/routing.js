'use strict';

const logger = require("./logger");

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

const setTemplateMiddleware = (options) => {

    const {layout, template} = options;

    return (req, res, next) => {
        if (!template || template === '') res.locals.template = 'default';
        else res.locals.template = template;
        if (!template || template === '') res.locals.layout = 'main';
        else res.locals.layout = layout;
        next();
    }
};

module.exports = (options) => {

    try {

        const {server, routes, handlers} = options;
        const {viewEngine} = JSON.parse(process.env.CONFIG);

        routes.forEach((route, i) => {

            let params = getHandler({handle: route.handle, handlers});
            let opt = {template: route.template, layout: viewEngine.defaultLayout};

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
