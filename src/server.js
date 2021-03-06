'use strict';

const express = require('express');
const initialization = require("./core/initialization");
const routing = require("./core/routing");
const viewer = require("./core/viewer");
const logger = require("./core/logger");
const routes = require("./routes");
const handlers = require("./handlers");

module.exports = {

    async start() {

        try {

            const server = express();

            initialization();
            routing({server, express, routes, handlers});
            viewer({server});

            const {address, port} = JSON.parse(process.env.CONFIG);

            server.listen(port, address, () => {

                logger.environment.info(`listening on http://${address}:${port}/`);
            });
            return true;
        } catch (e) {

            logger.environment.error(`initialization error: ${e}`);
            return false;
        }
    }
};