const express = require("express");
const router = express.Router();
const {
  createClerk,
  getSingleClerk,
} = require("../controllers/clerkController");

router.route("/register").post(createClerk);

router.route("/:email").get(getSingleClerk);

module.exports = router;
