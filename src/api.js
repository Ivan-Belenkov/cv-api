const fastify = require("fastify");
const serverless = require("serverless-http");

const app = fastify();

app.register(require("./routes"));

module.exports.handler = serverless(app);
