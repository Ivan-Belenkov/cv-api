"use strict";
const fp = require("fastify-plugin");

module.exports = async function (app) {
  app.register(fp(require("./helmet")));
  app.register(fp(require("./sensible")));
};
