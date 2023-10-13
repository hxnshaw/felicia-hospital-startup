const express = require("express");
const router = express.Router();
const {
  createClerk,
  getSingleClerk,
  loginClerk,
  logoutClerk,
  getAllClerks,
} = require("../controllers/clerkController");

router.route("/login").post(loginClerk);

router.route("/profile/logout").get(logoutClerk);

router.route("/").get(getAllClerks);

router.route("/register").post(createClerk);

router.route("/:email").get(getSingleClerk);

module.exports = router;
