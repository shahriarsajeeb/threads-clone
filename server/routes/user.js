const express = require("express");
const {
  createUser,
  loginUser,
  logoutUser,
  userDetails,
  getAllUsers,
  followUnfollowUser,
  getNotification,
  getUser,
  updateUserAvatar,
  updateUserInfo,
} = require("../controllers/user");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

router.route("/registration").post(createUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logoutUser);

router.route("/users").get(isAuthenticatedUser, getAllUsers);

router.route("/add-user").put(isAuthenticatedUser, followUnfollowUser);

router.route("/get-notifications").get(isAuthenticatedUser, getNotification);

router.route("/get-user/:id").get(isAuthenticatedUser, getUser);

router.route("/update-avatar").put(isAuthenticatedUser, updateUserAvatar);

router.route("/update-profile").put(isAuthenticatedUser, updateUserInfo);

router.route("/me").get(isAuthenticatedUser, userDetails);

module.exports = router;
