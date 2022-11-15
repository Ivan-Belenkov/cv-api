"use strict";

/**
 * @param {((function(any): Promise<void>)|Promise<(function(*): Promise<void>)|*>)[]} routeList
 * @param {string} prefix
 *
 * @returns {Promise<(function(*): Promise<void>)|*>}
 */
async function routeRegisterHelper(routeList, prefix) {
  return async function (app) {
    app.register(
      async (app) => {
        routeList.forEach((route) => app.register(route));
      },
      { prefix }
    );
  };
}

module.exports = routeRegisterHelper;
