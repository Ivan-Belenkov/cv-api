const fastify = require("fastify");
const serverless = require("serverless-http");
const fp = require("fastify-plugin");

const app = fastify();
app.register(async function (app) {
  app.register(fp(require("./plugins")));
  app.register(require("./routes"));
});

module.exports.handler = serverless(app);
