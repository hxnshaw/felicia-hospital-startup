const express = require("express");
const router = express.Router();
const {
  createClerk,
  getSingleClerk,
  loginClerk,
} = require("../controllers/clerkController");

router.route("/login").post(loginClerk);

router.route("/register").post(createClerk);

router.route("/:email").get(getSingleClerk);

module.exports = router;
