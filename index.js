'use strict';

const server = require("./src/server");

const run = async () => {

    await server.start();
};

run();
