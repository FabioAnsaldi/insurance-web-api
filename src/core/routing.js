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

module.exports = (options) => {

    try {

        const {server, routes, handlers} = options;

        routes.forEach((route, i) => {

            let params = getHandler({handle: route.handle, handlers});

            if (params.method.toLowerCase() === 'get') {

                server.get(route.path, params.handle);
                logger.environment.info(`${params.method.toUpperCase()} method enabled for: ${route.path}`);
            } else if (params.method.toLowerCase() === 'post') {

                server.post(route.path, params.handle);
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
