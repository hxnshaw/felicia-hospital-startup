const express = require("express");
const { sequelize } = require("./models");
const bodyParser = require("body-parser");
const app = express();
app.use(express.json());
app.use(bodyParser.json());

const patientRouter = require("./routes/patientRouter");

app.use("/api/v1/felicia-hospital", patientRouter);

app.listen(2024, async () => {
  console.log(`Server is live on port 2024`);
  await sequelize.authenticate();
  console.log(`Database Connected!`);
});
