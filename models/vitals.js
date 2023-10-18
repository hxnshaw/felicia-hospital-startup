"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Vitals extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Patient }) {
      // define association here
      this.belongsTo(Patient, { foreignKey: "patientId", as: "patient" });
      //Patient.belongsTo(Vitals, { foreignKey: "patientId", as: "patient" });
    }
  }
  Vitals.init(
    {
      temperature: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
      },
      height: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
      },
      pulse_rate: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
      },
      weight: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
      },
      blood_pressure: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
      },
      body_mass_index: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
      },
    },
    {
      sequelize,
      modelName: "Vitals",
    }
  );
  return Vitals;
};
