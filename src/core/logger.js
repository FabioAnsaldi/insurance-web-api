'use strict';

const pino = require('pino');
const fileSystem = require('fs');

let logger = {
    environment: null,
    server: null
};

const createFile = async (path) => {

    await fileSystem.writeFile(path, '', {flag: 'wx'}, (err) => {

        if (err)
            console.log("Logger createFile error: ", err);
    });
};

const returnLogger = (path) => {
    try {

        if (fileSystem.existsSync(path))
            return pino(pino.destination(path));
    } catch (e) {

        console.log("Logger setLogFile error: ", e);
        return false;
    }
};

const init = () => {

    try {

        let file = Date.now();
        let envFilepath = `./logs/environment-${file}.log`;
        let serFilepath = `./logs/server-${file}.log`;

        createFile(envFilepath);
        logger.environment = returnLogger(envFilepath);
        createFile(serFilepath);
        logger.server = returnLogger(serFilepath);
        logger.verbose = pino({prettyPrint: true});
    } catch (e) {

        console.log("Logger init error: ", e);
    }
};

const typology = {

    info(type, msg) {
        if (logger.verbose) {
            logger.verbose.info(msg);
        }
        if (type === 'server') logger.server.info(msg);
        if (type === 'environment') logger.environment.info(msg);
    },
    error(type, msg) {
        if (logger.verbose) {
            logger.verbose.error(msg);
        }
        if (type === 'server') logger.server.error(msg);
        if (type === 'environment') logger.environment.error(msg);
    }
};

init();

module.exports = {

    environment: {

        info(msg) {

            typology.info('environment', msg);
        },
        error(msg) {

            typology.error('environment', msg);
        }
    },
    server: {

        info(msg) {

            typology.info('server', msg);
        },
        error(msg) {

            typology.error('server', msg);
        }
    }
};
