const Joi = require("@hapi/joi");


function addDetailsValidate(req) {
  const schema = Joi.object({
    username: Joi.string().required().empty().messages({
      "string.base": `Name should be a type of 'text'`,
      "string.empty": `Name cannot be an empty field`,
      "any.required": `Name is a required field`,
    }),
    email: Joi.string().required().empty().email().messages({
      "string.base": `email should be a type of 'text'`,
      "string.empty": `email cannot be an empty field`,
      "string.email": `email format not valid`,
      "any.required": `email is a required field`,
    }),
    phone: Joi.number().integer().min(1000000000).max(9999999999).required().messages({
      "number.base": `Phone number should be number`,
      "number.empty": `Phone number cannot be an empty field`,
      "number.min": "Phone number must be 10 digit",
      "number.max": "Phone number can't be greater than 10 digit",
      "any.required": `Phone number is a required field`,
    }),
    gender: Joi.required().empty().messages({
      "string.empty": `gender cannot be an empty field`,
      "any.required": `gender is a required field`,
    }),
    address: Joi.string().required().empty().messages({
      "string.base": `address should be a type of 'text'`,
      "string.empty": `address cannot be an empty field`,
      "any.required": `address is a required field`,
    }),
    country: Joi.required().empty().messages({
      "string.empty": `country cannot be an empty field`,
      "any.required": `country is a required field`,
    }),
    pincode: Joi.string().required().empty().messages({
      "string.base": `pincode should be a type of 'text'`,
      "string.empty": `pincode cannot be an empty field`,
      "any.required": `pincode is a required field`,
    }),
    hobbies: Joi.required().empty().messages({
      "string.empty": `hobbies cannot be an empty field`,
      "any.required": `hobbies is a required field`,
    }),

  })
  const options = {
    abortEarly: false, // include all errors
  };
  return schema.validate(req, options);
}

function updateDetailsValidate(req) {
  const schema = Joi.object({
    username: Joi.string().required().empty().messages({
      "string.base": `Name should be a type of 'text'`,
      "string.empty": `Name cannot be an empty field`,
      "any.required": `Name is a required field`,
    }),
    email: Joi.string().required().empty().email().messages({
      "string.base": `email should be a type of 'text'`,
      "string.empty": `email cannot be an empty field`,
      "string.email": `email format not valid`,
      "any.required": `email is a required field`,
    }),
    phone: Joi.number().integer().min(1000000000).max(9999999999).required().messages({
      "number.base": `Phone number should be number`,
      "number.empty": `Phone number cannot be an empty field`,
      "number.min": "Phone number must be 10 digit",
      "number.max": "Phone number can't be greater than 10 digit",
      "any.required": `Phone number is a required field`,
    }),
    gender: Joi.required().empty().messages({
      "string.empty": `gender cannot be an empty field`,
      "any.required": `gender is a required field`,
    }),
    address: Joi.string().required().empty().messages({
      "string.base": `address should be a type of 'text'`,
      "string.empty": `address cannot be an empty field`,
      "any.required": `address is a required field`,
    }),
    country: Joi.required().empty().messages({
      "string.empty": `country cannot be an empty field`,
      "any.required": `country is a required field`,
    }),
    pincode: Joi.string().required().empty().messages({
      "string.base": `pincode should be a type of 'text'`,
      "string.empty": `pincode cannot be an empty field`,
      "any.required": `pincode is a required field`,
    }),
    hobbies: Joi.required().empty().messages({
      "string.empty": `hobbies cannot be an empty field`,
      "any.required": `hobbies is a required field`,
    })
  })
  const options = {
    abortEarly: false, // include all errors
  };
  return schema.validate(req, options);
}

function resetValidate(req) {
  const schema = Joi.object({
    old_password: Joi.string().required().empty().min(6).max(16).messages({
      "string.base": `password should be a type of 'text'`,
      "string.empty": `password cannot be an empty field`,
      "string.min": "password should be of minimum 6 characters",
      "string.max": "password should be of maximum 16 characters",
      "any.required": `password is a required field`,
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
    })
  })
  const options = {
    abortEarly: false, // include all errors
  };
  return schema.validate(req, options);
}

module.exports = {
  addDetailsValidate, updateDetailsValidate, resetValidate
};
