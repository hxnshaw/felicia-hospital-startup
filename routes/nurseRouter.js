const express = require("express");
const router = express.Router();
const {
  createNurse,
  getSingleNurse,
} = require("../controllers/nurseController");

router.route("/register").post(createNurse);

router.route("/:email").get(getSingleNurse);

module.exports = router;
