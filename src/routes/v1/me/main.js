"use strict";

module.exports = async function (app) {
  app.get("/", async function () {
    return "\"me\" endpoint";
  });
};