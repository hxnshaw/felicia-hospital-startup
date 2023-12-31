const express = require("express");
const router = express.Router();
const {
  createClerk,
  getSingleClerk,
  loginClerk,
  logoutClerk,
  getAllClerks,
  updateClerkProfile,
  updateClerkPassword,
  deleteClerk,
} = require("../controllers/clerkController");

const {
  authenticateUser,
  authorizePermissions,
} = require("../middlewares/authentication");

router
  .route("/")
  .get(authenticateUser, authorizePermissions("clerk"), getAllClerks);

router.route("/register").post(createClerk);

router.route("/login").post(loginClerk);

router.route("/profile/logout").get(logoutClerk);

router
  .route("/profile/update-profile")
  .put(authenticateUser, updateClerkProfile);

router
  .route("/profile/update-password")
  .put(authenticateUser, updateClerkPassword);

router
  .route("/:email")
  .get(authenticateUser, authorizePermissions("clerk"), getSingleClerk);

router
  .route("/delete-clerk/:id")
  .delete(authenticateUser, authorizePermissions("clerk"), deleteClerk);

module.exports = router;
