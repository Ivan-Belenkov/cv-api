"use strict";
const routeRegisterHelper = require("../routeRegisterHelper");

module.exports = routeRegisterHelper(
  [require("./experience"), require("./me")],
  "/v1"
);
