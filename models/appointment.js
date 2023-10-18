"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Patient }) {
      // define association here
      this.belongsTo(Patient, { foreignKey: "patientId", as: "patient" });
    }
  }
  Appointment.init(
    {
      purpose_of_visit: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        required: true,
      },
    },
    {
      sequelize,
      modelName: "Appointment",
    }
  );
  return Appointment;
};
