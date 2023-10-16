const express = require("express");
const router = express.Router();
const {
  createNurse,
  getSingleNurse,
  loginNurse,
  getAllNurses,
  logoutNurse,
  updateNurseProfile,
  updateNursePassword,
} = require("../controllers/nurseController");
const { authenticateUser } = require("../middlewares/authentication");

router.route("/login").post(loginNurse);

router
  .route("/profile/update-profile")
  .put(authenticateUser, updateNurseProfile);

router
  .route("/profile/update-password")
  .put(authenticateUser, updateNursePassword);

router.route("/profile/logout").get(authenticateUser, logoutNurse);

router.route("/").get(authenticateUser, getAllNurses);

router.route("/register").post(authenticateUser, createNurse);

router.route("/:email").get(authenticateUser, getSingleNurse);

module.exports = router;
