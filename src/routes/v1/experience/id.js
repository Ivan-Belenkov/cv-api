"use strict";

module.exports = async function (app) {
  app.get("/:id", async function (req) {
    return `"concrete experience" endpoint id: ${req.params.id}`;
  });
};
