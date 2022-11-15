"use strict";
const routeRegisterHelper = require("./routeRegisterHelper");

module.exports = routeRegisterHelper(
  [require("./v1")],
  "/.netlify/functions/api"
);
