const express = require("express");
const router = express.Router();
const {
  createNurse,
  getSingleNurse,
  loginNurse,
  getAllNurses,
  logoutNurse,
} = require("../controllers/nurseController");

router.route("/login").post(loginNurse);

router.route("/profile/logout").get(logoutNurse);

router.route("/").get(getAllNurses);

router.route("/register").post(createNurse);

router.route("/:email").get(getSingleNurse);

module.exports = router;
