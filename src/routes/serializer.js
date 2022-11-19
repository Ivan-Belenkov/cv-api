"use strict";
const _ = require("lodash");
const DEFAULT_LANGUAGE = "en";

/**
 * @typedef {string|number|boolean|null|undefined} AnyPrimitive
 */
/**
 * @typedef {'en'|'ru'} Language
 */
/**
 * @typedef {{[key in Language]?: string|string[]}} LanguageMap
 */
/**
 * @typedef {AnyPrimitive|RawData|LanguageMap|Date} RawDataValues
 */
/**
 * @typedef {{[key: string]: RawDataValues|RawDataValues[]}} RawData
 */
/**
 * @typedef {AnyPrimitive|SerializedData|Date} SerializedDataValues
 */
/**
 * @typedef {{[key: keyof RawData]: SerializedDataValues|SerializedDataValues[]}} SerializedData
 */

/**
 * @param {RawData} rawData
 * @param {Language} language
 *
 * @returns {SerializedData}
 */
function serializeOne(rawData, language) {
  return Object.keys(rawData).reduce((result, key) => {
    const value = rawData[key];
    if (_.isPlainObject(value) && DEFAULT_LANGUAGE in value) {
      result[key] = value[language] || value[DEFAULT_LANGUAGE];
    } else if (_.isObject(value) && !_.isDate(value)) {
      result[key] = serialize(value, language);
    } else {
      result[key] = value;
    }
    return result;
  }, {});
}

/**
 * @param {RawData|RawData[]} rawData
 * @param {Language} language
 *
 * @returns {SerializedData|SerializedData[]}
 */
function serialize(rawData, language) {
  return Array.isArray(rawData)
    ? rawData.map((item) => serializeOne(item, language))
    : serializeOne(rawData, language);
}

/**
 * @param {RawData|RawData[]} rawData
 * @param {Language=} [language='en']
 *
 * @returns {string}
 */
module.exports = function (rawData, language = DEFAULT_LANGUAGE) {
  return JSON.stringify(serialize(rawData, language));
};
