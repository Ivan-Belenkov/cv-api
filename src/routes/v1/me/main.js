"use strict";
const serializer = require("../../serializer");

module.exports = async function (app) {
  app.get("/", async function (req) {
    try {
      return await new Promise((resolve, reject) => {
        app.mongoose.Owner.findOne({}, { _id: 0 })
          .populate("skills", "-_id")
          .exec(function (err, owner) {
            if (err) return reject(err);
            resolve(owner.toObject());
          });
      }).then((raw) => serializer(raw, req.query.language));
    } catch (e) {
      return e;
    }
  });
};
