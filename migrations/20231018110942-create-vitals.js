"use strict";
/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("Vitals", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      temperature: {
        type: DataTypes.STRING,
      },
      height: {
        type: DataTypes.STRING,
      },
      pulse_rate: {
        type: DataTypes.STRING,
      },
      weight: {
        type: DataTypes.STRING,
      },
      blood_pressure: {
        type: DataTypes.STRING,
      },
      body_mass_index: {
        type: DataTypes.STRING,
      },
      patientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("Vitals");
  },
};
