"use strict";

const multilocalFieldSchema = {
  ru: {
    type: String,
  },
  en: {
    type: String,
  },
};

module.exports = async function (app) {
  app.register(
    require("fastify-mongoose-driver").plugin,
    {
      uri: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lrbiser.mongodb.net/cv_db?retryWrites=true&w=majority`,
      settings: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      useNameAndAlias: true,
      models: [
        {
          name: "skills",
          alias: "Skills",
          schema: {
            id: {
              type: Number,
            },
            name: {
              type: String,
            },
          },
          virtualize: (schema) => {
            schema.virtual("owner", {
              ref: "Owner",
              localField: "_id",
              foreignField: "skills",
            });
            schema.virtual("experience", {
              ref: "Experience",
              localField: "_id",
              foreignField: "skills",
            });
          },
        },
        {
          name: "owner",
          alias: "Owner",
          schema: {
            name: multilocalFieldSchema,
            details: multilocalFieldSchema,
            email: {
              type: String,
            },
            phone: {
              type: String,
            },
            social: {
              linkedin: {
                type: String,
              },
              github: {
                type: String,
              },
            },
            city: multilocalFieldSchema,
            country: multilocalFieldSchema,
            languages: [multilocalFieldSchema],
            occupation: multilocalFieldSchema,
            skills: [
              {
                type: "ObjectId",
                ref: "Skills",
                validateExistance: true,
              },
            ],
          },
        },
        {
          name: "experience",
          alias: "Experience",
          schema: {
            id: {
              type: Number,
            },
            job_title: multilocalFieldSchema,
            company_title: multilocalFieldSchema,
            city: multilocalFieldSchema,
            country: multilocalFieldSchema,
            start_date: {
              type: Date,
            },
            end_date: {
              type: Date,
            },
            achievements: {
              ru: [String],
              en: [String],
            },
            skills: [
              {
                type: "ObjectId",
                ref: "Skills",
                validateExistance: true,
              },
            ],
          },
        },
      ],
    },
    (err) => {
      if (err) throw err;
    }
  );
};
