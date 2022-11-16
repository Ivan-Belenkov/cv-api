"use strict";

module.exports = async function (app) {
  app.register(require("@fastify/sensible"), {
    errorHandler: false,
  });
};
