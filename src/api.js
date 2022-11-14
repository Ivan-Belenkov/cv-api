const fastify = require("fastify");
const serverless = require("serverless-http");

const app = fastify();

app.register(function (app, _, done) {
  app.get("/", async (request, reply) => {
    return { hello: 'world' }
  });
  done();
}, { prefix: "/.netlify/functions/api" });

module.exports.handler = serverless(app);
