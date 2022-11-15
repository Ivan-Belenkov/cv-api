"use strict";
const routeRegisterHelper = require("../../routeRegisterHelper");

module.exports = routeRegisterHelper(
  [require("./main"), require("./id")],
  "/experience"
);
