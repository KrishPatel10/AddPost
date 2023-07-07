const Joi = require('joi');

const postValidationSchema = Joi.object({
  title: Joi.string().min(5).max(100).required(),
  description: Joi.string().min(10).max(5000).required(),
  author: Joi.string().required(),
  uploadOption: Joi.string().valid('personal', 'community').default('personal'),
  date: Joi.date().default(Date.now),
  files: Joi.array().items(
    Joi.object({
      filename: Joi.string(),
      contentType: Joi.string(),
      fileData: Joi.binary()
    })
  )
});

module.exports = postValidationSchema;
