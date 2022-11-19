"use strict";
const serializer = require("../../serializer");

module.exports = async function (app) {
  app.get("/:id", async function (req, res) {
    try {
      return await new Promise((resolve, reject) => {
        app.mongoose.Experience.findOne({ id: req.params.id }, { _id: 0 })
          .populate("skills", "-_id")
          .exec(function (err, experience) {
            if (err) return reject(err);
            if (!experience) return reject(res.notFound());
            resolve(experience.toObject());
          });
      }).then((raw) => serializer(raw, req.query.language));
    } catch (e) {
      return e;
    }
  });
};
