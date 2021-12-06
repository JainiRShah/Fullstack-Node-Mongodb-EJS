const { GeneralResponse } = require("../utils/response");
const { GeneralError, NotFound, BadRequest } = require("../utils/error");
const config = require("../utils/config");
const { UserModel, AuthModel } = require("../helpers/db");
const logger = require('../loggers/logger')
const { addDetailsValidate, updateDetailsValidate, resetValidate } = require('../validations/userValidation')
const bcrypt = require("bcrypt");
const saltRounds = 10;

const {
  mailSend
} = require("../services/mail");
const {
  smsSend
} = require("../services/sms");



exports.userAdd = (req, res) => {
  res.render('userAdd', {
    values: req.body
  });
}


exports.resetPassword = (req, res) => {
  res.render('resetPassword', {
    values: req.body
  });
}


// Create and Save a new User
exports.addUserDetails = async (req, res, next) => {
  try {
    let { error } = addDetailsValidate(req.body);
    if (error) {
      if (error.details[0].context.key == 'username') {
        var err1 = error.details[0].message;

        return res.render('userAdd', {
          error1: err1,
          values: req.body
        });
      }
      if (error.details[0].context.key == 'email') {
        var err1 = error.details[0].message;

        return res.render('userAdd', {
          error2: err1,
          values: req.body
        });
      }
      if (error.details[0].context.key == 'phone') {
        var err1 = error.details[0].message;

        return res.render('userAdd', {
          error3: err1,
          values: req.body
        });
      }
      if (error.details[0].context.key == 'gender') {
        var err1 = error.details[0].message;

        return res.render('userAdd', {
          error4: err1,
          values: req.body
        });
      }
      if (error.details[0].context.key == 'address') {
        var err1 = error.details[0].message;

        return res.render('userAdd', {
          error5: err1,
          values: req.body
        });
      }
      if (error.details[0].context.key == 'country') {
        var err1 = error.details[0].message;

        return res.render('userAdd', {
          error6: err1,
          values: req.body
        });
      }
      if (error.details[0].context.key == 'hobbies') {
        var err1 = error.details[0].message;

        return res.render('userAdd', {
          error8: err1,
          values: req.body
        });
      }
      if (error.details[0].context.key == 'pincode') {
        var err1 = error.details[0].message;

        return res.render('userAdd', {
          error7: err1,
          values: req.body
        });
      }
    }
    let fileName;
    if (typeof (req.file) == 'undefined' || typeof (req.file) == undefined) {
      fileName = "";
    } else {
      fileName = req.file.originalname
    }     // Create a User
    const user = await new UserModel({
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone,
      gender: req.body.gender,
      hobbies: req.body.hobbies,
      country: req.body.country,
      address: req.body.address,
      pincode: req.body.pincode,
      image: fileName
    });
    await user.save((err, response) => {
      if (err || !response) {
        var err1 = "user details added failed"

        return res.render('userAdd', {
          error: err1,
          values: req.body,
          value: req.file
        });
      }
      else {
        mailSend(req.body.email, req.body.username);
        smsSend(req.body.username, req.body.phone);
        res.redirect('/userList');


      }
    })

  }

  catch (err) {
    logger.error("err", err)
    next(new GeneralError("user details added failed"));
  }
};

// Retrieve all users from the database.
exports.userList = (req, res, next) => {
  try {

    UserModel.find({}, (err, response) => {
      if (err) throw err;
      res.render('userList', {
        users: response
      }
      );

    })
  }
  catch (err) {
    next(new GeneralError('error while getting user detail'))
  }
}

exports.resetPass = async (req, res, next) => {
  try {
    let { error } = resetValidate(req.body);
    if (error) { 
      if (error.details[0].context.key == 'old_password') {
        var err1 = error.details[0].message;
        return res.render('newPassword', {
          error1: err1,
          values: req.body
        });
      }
      if (error.details[0].context.key == 'password') {
        var err1 = error.details[0].message;
        return res.render('newPassword', {
          error2: err1,
          values: req.body
        });
      }
      if (error.details[0].context.key == 'confirm_password') {
        var err1 = error.details[0].message;
        return res.render('newPassword', {
          error3: err1,
          values: req.body
        });
      }
    }
    const id = req.cookies.id;
    AuthModel.findOne({ _id: id }, async (err, response) => {

      if (response) {

        const comparision = await bcrypt.compare(req.body.old_password, response.password);
        if (comparision) {
          const encryptedPassword = await bcrypt.hash(req.body.password, saltRounds);
          const updatePassword = { password: encryptedPassword };
          AuthModel.updateOne({ _id: id }, updatePassword, async (err, resp) => {
            logger.info(resp)
            if (resp) {
              var err1 = "Your Password has been Reset"
              return res.render('resetPassword', {
                error: err1,
                values: req.body
              });
            }
            else {
              logger.info(err)
            }
          })
        } else {
          var err1 = "Current Password is incorrect"
          return res.render('resetPassword', {
            error: err1,
            values: req.body
          });

        }
      }

    })
  }
  catch (err) {
    logger.error("err", err)
    next(new GeneralError("user registration failed"));
  }
};



exports.getUserByUserId = async (req, res, next) => {
  const id = req.query._id;
  try {
    UserModel.findOne({ _id: id }, async(err, response) => {
      if (err) throw err;
      res.render('userUpdate', {
        values: response
      });
    });

  } catch (err) {
    next(new GeneralError('error while getting user detail'))
  }
}

exports.updateUserDetails = async (req, res, next) => {
  try {
    let { error } = updateDetailsValidate(req.body);

    if (error) {
      if (error.details[0].context.key == 'username') {
        var err1 = error.details[0].message;

        return res.render('userUpdate', {
          error1: err1,
          values: req.body
        });
      }
      if (error.details[0].context.key == 'email') {
        var err1 = error.details[0].message;

        return res.render('userUpdate', {
          error2: err1,
          values: req.body
        });
      }
      if (error.details[0].context.key == 'phone') {
        var err1 = error.details[0].message;

        return res.render('userUpdate', {
          error3: err1,
          values: req.body
        });
      }
      if (error.details[0].context.key == 'gender') {
        var err1 = error.details[0].message;

        return res.render('userUpdate', {
          error4: err1,
          values: req.body
        });
      }
      if (error.details[0].context.key == 'address') {
        var err1 = error.details[0].message;

        return res.render('userUpdate', {
          error5: err1,
          values: req.body
        });
      }
      if (error.details[0].context.key == 'country') {
        var err1 = error.details[0].message;

        return res.render('userUpdate', {
          error6: err1,
          values: req.body
        });
      }
      if (error.details[0].context.key == 'hobbies') {
        var err1 = error.details[0].message;

        return res.render('userUpdate', {
          error8: err1,
          values: req.body
        });
      }
      if (error.details[0].context.key == 'pincode') {
        var err1 = error.details[0].message;

        return res.render('userUpdate', {
          error7: err1,
          values: req.body
        });
      }
    }
    const id = req.query._id;
    if (typeof (req.file) == 'undefined' || typeof (req.file) == undefined) {
      const updateUser = {
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        gender: req.body.gender,
        hobbies: req.body.hobbies,
        country: req.body.country,
        address: req.body.address,
        pincode: req.body.pincode
      };
      UserModel.updateOne({ _id: id }, updateUser, async (err, response) => {
        if (err || !response) {
          var err1 = "user details updation failed";
          return res.render('userUpdate', {
            error: err1,
            values: req.body
          });
        }
        else {
          res.redirect('/userList');
        }
      })


    } else {
      const UpdateuserImage = {
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        gender: req.body.gender,
        hobbies: req.body.hobbies,
        country: req.body.country,
        address: req.body.address,
        pincode: req.body.pincode,
        image: req.file.originalname
      };
      UserModel.updateOne({ _id: id }, UpdateuserImage, async(err, response) => {
        if (err || !response) {
          var err1 = "user details updation failed";
          return res.render('userUpdate', {
            error: err1,
            values: req.body
          });
        }
        else {
          res.redirect('/userList');
        }
      })
    }

  }
  catch (err) {
    logger.error("err", err)
    next(new GeneralError("user details updation failed"));
  }
};

exports.deleteUserDetails = async (req, res, next) => {
  const id = req.query._id;

  try {
    UserModel.deleteOne({ _id: id }, async(err, response) => {
      if (err) throw err;
      await res.redirect('/userList');
    });

  } catch (err) {
    next(new GeneralError('error while deleting user detail'))
  }
}

