'use strict';

const server = require("./src/core/server");

const run = async () => {

    await server.start();
};

run();
