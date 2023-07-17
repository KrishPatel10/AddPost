
const Joi = require('joi');

const commentValidationSchema = Joi.object({
  content: Joi.string().required().min(5).max(500),
  user: Joi.string().required().min(2).max(50)
});

module.exports = commentValidationSchema;
