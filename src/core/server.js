'use strict';

const express = require('express');
const initialization = require("./initialization");
const logger = require("./logger");

module.exports = {

    async start() {

        try {
            let env = initialization();
            let server = express();

            server.get('/', (req, res) => res.send('Hello World!'));
            return server.listen(env.config.port, () => {

                logger.environment.info(`listening on http://${env.config.address}:${env.config.port}/`);
            });
        } catch (e) {

            logger.environment.error(`initialization error: ${e}`);
            return false;
        }
    }
};
