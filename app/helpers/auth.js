const jwt = require("jsonwebtoken");
const { UnAuthorized } = require("../utils/error");
const logger = require('../loggers/logger')
const { AuthModel } = require("../helpers/db");

// Middeware for Generating a new JWT Token
const generateToken = (data) => {
  let token = jwt.sign(data, process.env.SECRET_KEY, {
    expiresIn: process.env.TOKEN_EXPIRY,
  });
  return token;
};

//authenticate
const authenticate = async (req, res, next) => {

  try {
    const token = req.cookies.jwt;
    if (token == undefined) {
      res.redirect('/');
    }

    const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
    logger.info("1", verifyUser)
    AuthModel.findOne({ _id: verifyUser.userid }, async (err, response) => {
      logger.info("respo", response)
      if (err) {
        logger.error(err);
        res.redirect('/');
      }
    })

    next();
  } catch (error) {
    logger.info(error)
  }
}




module.exports = {
  authenticate,
  generateToken
};
