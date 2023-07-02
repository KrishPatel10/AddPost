const Joi = require('joi');

const postSchema = Joi.object({
  title: Joi.string().required().min(5).max(100),
  description: Joi.string().required().min(10).max(500),
  author: Joi.string().required(),
  date: Joi.date().optional(),
  category: Joi.string().optional(),
  files: Joi.array().items(
    Joi.object({
      path: Joi.string().required(),
      filename: Joi.string().optional(),
      contentType: Joi.string().optional(),
      fileData: Joi.binary().optional()
    })
  )
});

module.exports = postSchema;
