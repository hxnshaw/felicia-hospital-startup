const { Appointment, Patient } = require("../models");

exports.createAppointment = async (req, res) => {
  const { patient_id } = req.params;
  const { purpose_of_visit, date } = req.body;
  try {
    const patient = await Patient.findOne({
      where: { patient_id: patient_id },
    });

    if (!patient) {
      return res.status(404).json({ message: "Patient Not Found" });
    }

    if (!purpose_of_visit || !date) {
      return res.status(400).json({ message: "Please Provide Complete Data" });
    }

    const patientHasBookedAnAppointment = await Appointment.findOne({
      where: { patientId: patient.id },
    });

    if (patientHasBookedAnAppointment) {
      return res.status(400).json("The Patient Already Has An Appointment");
    }

    const patientAppointment = await Appointment.create({
      purpose_of_visit,
      date,
      patientId: patient.id,
    });
    res.status(200).json({ data: patientAppointment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateAppointment = async (req, res) => {
  const { patient_id } = req.params;
  const { purpose_of_visit, date } = req.body;
  try {
    const patient = await Patient.findOne({
      where: { patient_id: patient_id },
      include: ["appointment"],
    });
    if (!patient) {
      return res.status(404).json({ message: "Patient Not Found" });
    }
    patient.appointment.purpose_of_visit = purpose_of_visit;
    patient.appointment.date = date;

    await patient.appointment.save();
    res.status(200).json({ message: "Appointment Updated!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteAppointment = async (req, res) => {
  const { patient_id } = req.params;
  try {
    const patient = await Patient.findOne({
      where: { patient_id: patient_id },
      include: ["appointment"],
    });

    if (!patient) {
      return res.status(404).json({ message: "Patient Not Found" });
    }
    await patient.appointment.destroy();
    res.status(200).json({ message: "Appointment Deleted!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
