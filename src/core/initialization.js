'use strict';

const config = require("../../config/default.json");
const logger = require("./logger");
const routes = require("../routes");

module.exports = () => {

    try {

        let custom = process.argv[2] || 'default';
        let local = require(`../../config/${custom}`);
        let configuration = {...config, ...local};

        process.env.CONFIG = JSON.stringify(configuration);
        logger.environment.info( `process.env.CONFIG: ${process.env.CONFIG}`);

        return {
            routes: routes,
            config: configuration
        };
    } catch (e) {

        logger.environment.error( `initialization error: ${e}`);
        return false;
    }
};
