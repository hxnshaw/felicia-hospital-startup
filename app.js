require("dotenv").config();
const express = require("express");
const { sequelize } = require("./models");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.DB_PORT || 2024;
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser(process.env.JWT_SECRET_KEY));

const patientRouter = require("./routes/patientRouter");
const nurseRouter = require("./routes/nurseRouter");
const clerkRouter = require("./routes/clerkRouter");
const vitalsRouter = require("./routes/vitalsRouter");
const appointmentRouter = require("./routes/appointmentRouter");

app.use("/api/v1/felicia-hospital/patients", patientRouter);
app.use("/api/v1/felicia-hospital/nurses", nurseRouter);
app.use("/api/v1/felicia-hospital/clerks", clerkRouter);
app.use("/api/v1/felicia-hospital/vitals", vitalsRouter);
app.use("/api/v1/felicia-hospital/appointments", appointmentRouter);

app.listen(port, async () => {
  console.log(`Server is live on port 2024`);
  await sequelize.authenticate();
  console.log(`Database Connected!`);
});
