const bcrypt = require("bcrypt");
const { generateToken } = require("../helpers/auth");
const { AuthModel } = require("../helpers/db");
const { GeneralError } = require("../utils/error");
const saltRounds = 10;
const logger = require('../loggers/logger');
const { registerValidate, loginValidate, passwordValidate, newPasswordValidate } = require('../validations/authValidation')

const {
  OTPsend
} = require("../services/mail");

var otp = Math.random();
otp = otp * 1000000;
otp = parseInt(otp);
logger.info(otp);

exports.register = (req, res) => {
  res.render('register', {
    values: req.body
  });
}

exports.signup = async (req, res, next) => {
  try {
    let { error } = registerValidate(req.body);
    if (error) {
      if (error.details[0].context.key == 'fname') {
        var err1 = error.details[0].message;
        return res.render('register', {
          error1: err1,
          values: req.body
        });
      }
      if (error.details[0].context.key == 'lname') {
        var err1 = error.details[0].message;
        return res.render('register', {
          error2: err1,
          values: req.body
        });
      }
      if (error.details[0].context.key == 'email') {
        var err1 = error.details[0].message;
        return res.render('register', {
          error3: err1,
          values: req.body
        });
      }
      if (error.details[0].context.key == 'password') {
        var err1 = error.details[0].message;
        return res.render('register', {
          error4: err1,
          values: req.body
        });
      }
      if (error.details[0].context.key == 'confirm_password') {
        var err1 = error.details[0].message;
        return res.render('register', {
          error5: err1,
          values: req.body
        });
      }
    }
    const encryptedPassword = await bcrypt.hash(req.body.password, saltRounds);
    AuthModel.findOne({ email: req.body.email }, async (err, response) => {

      if (!response) {
        const user = await new AuthModel({
          fname: req.body.fname,
          lname: req.body.lname,
          email: req.body.email,
          password: encryptedPassword,
        });

        user.save((err, response) => {
          if (err) {
            let err1 = "User registration failed";
            return res.render('register', {
              error: err1,
              values: req.body
            });

          } else {
            let success = "" + req.body.fname + "  " + req.body.lname + " successfully register";
            return res.render('register', {
              error: success,
              values: req.body
            });
          }
        })

      } else {
        let err1 = "User Email already exist";
        return res.render('register', {
          error: err1,
          values: req.body
        });
      }
    })

  }
  catch (err) {
    logger.error("err", err)
    next(new GeneralError("user registration failed"));
  }
};


exports.forgetPassword = (req, res) => {
  res.render('forgetPassword')
}

exports.verifyEmail = async (req, res, next) => {
  try {
    let { error } = passwordValidate(req.body);
    if (error) {
      if (error.details[0].context.key == 'email') {
        var err1 = error.details[0].message;
        return res.render('forgetPassword', {
          error1: err1
        });
      }
    }
    logger.info(req.body.email)

    AuthModel.findOne({ email: req.body.email }, async (err, response) => {

      if (!response) {
        var err1 = "Please enter valid Email ";
        return res.render('forgetPassword', {
          error: err1
        });
      } else {
        OTPsend(req.body.email, otp);
        const updateOTP = { otp: otp };
        AuthModel.updateOne({ email: req.body.email }, updateOTP, async (err, response) => {
          logger.info(response)
        })
        res.redirect('/otp');
      }
    })

  }
  catch (err) {
    logger.error("err", err)
    next(new GeneralError("reset password failed"));
  }
};


exports.otp = (req, res) => {
  res.render('otp')
}

exports.verifyOtp = async (req, res, next) => {
  try {
    logger.info(req.body.otp)
    if (otp == req.body.otp) {
      res.redirect("/newPassword");

    } else {
      var err1 = "Please enter correst OTP";
      return res.render('otp', {
        error: err1
      });
    }
  }
  catch (err) {
    logger.error("err", err)
    next(new GeneralError("reset password failed"));
  }
};


exports.newPassword = (req, res) => {
  res.render('newPassword', {
    values: req.body
  });
}

exports.updatePassword = async (req, res, next) => {
  try {
    let { error } = newPasswordValidate(req.body);
    if (error) {

      if (error.details[0].context.key == 'password') {
        var err1 = error.details[0].message;
        return res.render('newPassword', {
          error1: err1,
          values: req.body
        });
      }
      if (error.details[0].context.key == 'confirm_password') {
        var err1 = error.details[0].message;
        return res.render('newPassword', {
          error2: err1,
          values: req.body
        });
      }
    }

    const encryptedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const updatePassword1 = { password: encryptedPassword };
    AuthModel.updateOne({ otp: otp }, updatePassword1, async (err, response) => {
      logger.info(response)
      if (err) throw err;

      res.redirect('/')

    })

  }
  catch (err) {
    logger.error("err", err)
    next(new GeneralError("user registration failed"));
  }
};



exports.login = (req, res) => {
  res.render('login', {
    values: req.body
  });
}

exports.authUser = async (req, res, next) => {
  try {
    let { error } = loginValidate(req.body);
    if (error) {
      if (error.details[0].context.key == 'email') {
        var err1 = error.details[0].message;
        return res.render('login', {
          error1: err1,
          values: req.body
        });
      }
      if (error.details[0].context.key == 'password') {
        var err1 = error.details[0].message;
        return res.render('login', {
          error2: err1,
          values: req.body
        });
      }
    }
    AuthModel.findOne({ email: req.body.email }, async (err, response) => {

      if (err) {
        var err1 = "User not found";
        return res.render('login', {
          error: err1,
          values: req.body
        });

      } else {
        const comparision = await bcrypt.compare(req.body.password, response.password);
        logger.info(comparision)
        if (comparision) {
          let userdata = {
            username: response.email,
            fname: response.fname,
            lname: response.lname,
            userid: response._id,
          };
          let tokenValue = generateToken(userdata);
          logger.info(tokenValue)
          const updateUser = { token: tokenValue };
          AuthModel.updateOne({ _id: response._id }, updateUser, async (err, response) => {
            if (err) throw err;
          })



          res.cookie("jwt", tokenValue, {
            expires: new Date(Date.now() + 30000000)
          })
          res.cookie("id", response._id, {
            expires: new Date(Date.now() + 30000000)
          })

          res.redirect('/userList');

        } else {
          var err1 = "Email and password does not match";

          return res.render('login', {
            error: err1,
            values: req.body
          });
        }
      }
    })
  } catch (err) {
    logger.error("err", err)
    next(new GeneralError("user login failed"));
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.clearCookie("id");

    res.redirect('/');
  } catch (err) {
    logger.error("err", err)
    next(new GeneralError("user logout failed"));
  }
};