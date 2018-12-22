'use strict';

const logger = require("./logger");
const exphbs = require('express-handlebars');

module.exports = (options) => {

    try {

        const {server} = options;
        const {viewEngine} = JSON.parse(process.env.CONFIG);
        const expHbsConfig = exphbs({
            defaultLayout: viewEngine.defaultLayout,
            layoutsDir: viewEngine.layoutsDir,
            partialsDir: viewEngine.partialsDir
        });

        server.engine(viewEngine.ext, expHbsConfig);
        server.set('view engine', viewEngine.name);
        server.set('views', 'src/views');
        return true;
    } catch (e) {

        logger.environment.error(`viewer error: ${e}`);
        return false;
    }
};
