const Joi = require("@hapi/joi");

function registerValidate(req) {
  const schema = Joi.object({
    fname: Joi.string().required().empty().messages({
      "string.base": `first name should be a type of 'text'`,
      "string.empty": `first name cannot be an empty field`,
      "any.required": `first name is a required field`,
    }),
    lname: Joi.string().required().empty().messages({
      "string.base": `last name should be a type of 'text'`,
      "string.empty": `last name cannot be an empty field`,
      "any.required": `last name is a required field`,
    }),
    email: Joi.string().required().empty().email().messages({
      "string.base": `Email should be a type of 'text'`,
      "string.empty": `Email cannot be an empty field`,
      "string.email": `Email format not valid`,
      "any.required": `Email is a required field`,
    }),
    password: Joi.string().required().empty().min(6).max(16).messages({
      "string.base": `password should be a type of 'text'`,
      "string.empty": `password cannot be an empty field`,
      "string.min": "password should be of minimum 6 characters",
      "string.max": "password should be of maximum 16 characters",
      "any.required": `password is a required field`,
    }),
    confirm_password: Joi.string().required().valid(Joi.ref('password')).messages({
      "string.base": `confirm password should be a type of 'text'`,
      "any.only": "confirm password doesn't match password",
      "any.required": `confirm password is a required field`,
    }),

  })
  const options = {
    abortEarly: false, // include all errors
  };
  return schema.validate(req, options);
}

function loginValidate(req) {
  const schema = Joi.object({
    email: Joi.string().required().empty().email().messages({
      "string.base": `Email should be a type of 'text'`,
      "string.empty": `Email cannot be an empty field`,
      "string.email": `Email format not valid`,
      "any.required": `Email is a required field`,
    }),
    password: Joi.string().required().empty().min(6).max(16).messages({
      "string.base": `password should be a type of 'text'`,
      "string.empty": `password cannot be an empty field`,
      "string.min": "password should be of minimum 6 characters",
      "string.max": "password should be of maximum 16 characters",
      "any.required": `password is a required field`,
    })
  })
  const options = {
    abortEarly: false, // include all errors
  };
  return schema.validate(req, options);
}

function passwordValidate(req) {
  const schema = Joi.object({
    email: Joi.string().required().empty().email().messages({
      "string.base": `Email should be a type of 'text'`,
      "string.empty": `Email cannot be an empty field`,
      "string.email": `Email format not valid`,
      "any.required": `Email is a required field`,
    })
  })
  const options = {
    abortEarly: false, // include all errors
  };
  return schema.validate(req, options);
}



function newPasswordValidate(req) {
  const schema = Joi.object({
    password: Joi.string().required().empty().min(6).max(16).messages({
      "string.base": `password should be a type of 'text'`,
      "string.empty": `password cannot be an empty field`,
      "string.min": "password should be of minimum 6 characters",
      "string.max": "password should be of maximum 16 characters",
      "any.required": `password is a required field`,
    }),
    confirm_password: Joi.string().required().valid(Joi.ref('password')).messages({
      "string.base": `confirm password should be a type of 'text'`,
      "any.only": "confirm password doesn't match password",
      "any.required": `confirm password is a required field`,
    })
  })
  const options = {
    abortEarly: false, // include all errors
  };
  return schema.validate(req, options);
}

module.exports = {
  registerValidate, loginValidate, passwordValidate, newPasswordValidate
};
