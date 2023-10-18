const express = require("express");
const router = express.Router();
const {
  createAppointment,
  updateAppointment,
  deleteAppointment,
} = require("../controllers/appointmentController");

const {
  authenticateUser,
  authorizePermissions,
} = require("../middlewares/authentication");

router
  .route("/:patient_id")
  .post(
    authenticateUser,
    authorizePermissions("nurse", "clerk"),
    createAppointment
  );

router
  .route("/:patient_id")
  .put(
    authenticateUser,
    authorizePermissions("nurse", "clerk"),
    updateAppointment
  );

router
  .route("/:patient_id")
  .delete(
    authenticateUser,
    authorizePermissions("nurse", "clerk"),
    deleteAppointment
  );

module.exports = router;
