const express = require("express");
const router = express.Router();
const {
  createVitals,
  updateVitals,
  getAllVitals,
} = require("../controllers/vitalsController");

const {
  authenticateUser,
  authorizePermissions,
} = require("../middlewares/authentication");
router
  .route("/new-vitals/:patient_id")
  .post(authenticateUser, authorizePermissions("nurse"), createVitals);

router
  .route("/update-vitals/:patient_id")
  .put(authenticateUser, authorizePermissions("nurse"), updateVitals);

router.route("/").get(getAllVitals);
module.exports = router;
