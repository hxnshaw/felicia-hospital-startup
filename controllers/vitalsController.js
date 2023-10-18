const { Vitals, Patient } = require("../models");

exports.createVitals = async (req, res) => {
  const { patient_id } = req.params;
  const {
    temperature,
    height,
    pulse_rate,
    weight,
    blood_pressure,
    body_mass_index,
    // patientId,
  } = req.body;
  try {
    const patient = await Patient.findOne({
      where: { patient_id: patient_id },
    });
    if (!patient) {
      return res.status(404).json({ message: "Patient Not Found" });
    }
    if (
      !temperature ||
      !height ||
      !pulse_rate ||
      !weight ||
      !blood_pressure ||
      !body_mass_index
    ) {
      return res.status(400).json({ message: "Please Provide Complete Data" });
    }

    const patientHasVitalsTakenAlready = await Vitals.findOne({
      where: { patientId: patient.id },
    });

    if (patientHasVitalsTakenAlready) {
      return res
        .status(400)
        .json("The Patients Vitals Have Been Taken Already");
    }
    const patientVitals = await Vitals.create({
      temperature,
      height,
      pulse_rate,
      weight,
      blood_pressure,
      body_mass_index,
      patientId: patient.id,
    });
    res.status(200).json({ data: patientVitals });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateVitals = async (req, res) => {
  const {
    temperature,
    height,
    pulse_rate,
    weight,
    blood_pressure,
    body_mass_index,
  } = req.body;
  const { patient_id } = req.params;
  try {
    if (
      !temperature ||
      !height ||
      !pulse_rate ||
      !weight ||
      !blood_pressure ||
      !body_mass_index
    ) {
      return res.status(400).json({ message: "Please Provide Complete Data" });
    }
    const patient = await Patient.findOne({
      where: { patient_id: patient_id },
      include: ["vitals"],
    });
    if (!patient) {
      return res.status(404).json({ message: "Patient Does Not Exist" });
    }

    patient.vitals.temperature = temperature;
    patient.vitals.height = height;
    patient.vitals.pulse_rate = pulse_rate;
    patient.vitals.weight = weight;
    patient.vitals.blood_pressure = blood_pressure;
    patient.vitals.body_mass_index = body_mass_index;

    await patient.vitals.save();
    res.status(200).json({
      message: `${patient.first_name} ${patient.last_name}'s profile updated!`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllVitals = async (req, res) => {
  try {
    const vitals = await Vitals.findAll({
      include: [{ model: Patient, as: "patient" }],
    });
    res.status(200).json({ data: vitals });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
