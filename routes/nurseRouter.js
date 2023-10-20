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
  deleteNurse,
} = require("../controllers/nurseController");
const {
  authenticateUser,
  authorizePermissions,
} = require("../middlewares/authentication");

router.route("/login").post(loginNurse);

router
  .route("/profile/update-profile")
  .put(authenticateUser, updateNurseProfile);

router
  .route("/profile/update-password")
  .put(authenticateUser, updateNursePassword);

router.route("/profile/logout").get(authenticateUser, logoutNurse);

router
  .route("/")
  .get(authenticateUser, authorizePermissions("clerk"), getAllNurses);

router.route("/register").post(authenticateUser, createNurse);

router
  .route("/:email")
  .get(
    authenticateUser,
    authorizePermissions("clerk", "nurse"),
    getSingleNurse
  );

router
  .route("/delete-nurse/:id")
  .delete(authenticateUser, authorizePermissions("clerk"), deleteNurse);

module.exports = router;
