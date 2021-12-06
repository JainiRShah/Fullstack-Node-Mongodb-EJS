const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const usersController = require("../controllers/userController");
const { authenticate } = require('../helpers/auth');
const { upload } = require("../services/multer");

router.get("/register", authController.register);
router.post("/signup", authController.signup);

router.get("/forgetPassword", authController.forgetPassword);
router.post("/verifyEmail", authController.verifyEmail);

router.get("/otp", authController.otp);
router.post("/verifyOtp", authController.verifyOtp);

router.get("/newPassword", authController.newPassword);
router.post("/updatePassword", authController.updatePassword);

router.get("/", authController.login);
router.post("/loginUser", authController.authUser);

router.get("/logout", authenticate, authController.logout)

router.get("/resetPassword", authenticate, usersController.resetPassword);
router.post("/resetPass", authenticate, usersController.resetPass);

router.get("/userList", authenticate, usersController.userList);

router.get("/userAdd",authenticate, usersController.userAdd);
router.post("/add",authenticate,upload.single("image"), usersController.addUserDetails);

router.get("/userUpdate",authenticate, usersController.getUserByUserId);
router.post("/update",authenticate,upload.single("image"), usersController.updateUserDetails);

router.get("/userDelete", authenticate, usersController.deleteUserDetails);

module.exports = router;
