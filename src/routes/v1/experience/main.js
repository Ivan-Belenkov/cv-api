"use strict";
const serializer = require("../../serializer");

module.exports = async function (app) {
  app.get("/", async function (req) {
    try {
      return await new Promise((resolve, reject) => {
        app.mongoose.Experience.find({}, { _id: 0, achievements: 0, skills: 0 })
          .sort({ start_date: -1 })
          .exec(function (err, experienceList) {
            if (err) return reject(err);
            resolve(experienceList.map((experience) => experience.toObject()));
          });
      }).then((raw) => serializer(raw, req.query.language));
    } catch (e) {
      return e;
    }
  });
};
