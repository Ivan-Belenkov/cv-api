"use strict";

module.exports = async function (app) {
  app.register(require("@fastify/cors"), {
    origin: [/localhost:\d{4}/, /cv-[a-zA-Z]+\.netlify\.app/],
  });
};
