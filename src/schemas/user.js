const joi = require('joi');
module.exports = {
  login: joi.object({
    userName: joi
      .string()
      .required(),
    password: joi
      .string()
      .required()
  }),
  validateToken: joi.object({
    token: joi
      .string()
      .required()
  }),
  createUser: joi.object({
    userName: joi
      .string()
      .required(),
    emailId: joi
      .string()
      .email(),
    phoneNumber: joi
      .number()
      .integer()
      .min(1000000000)
      .max(9999999999),
    address: joi
      .string(),
    password: joi
      .string()
      .required()

  })
};






  