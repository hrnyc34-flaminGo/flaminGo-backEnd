const mongoose = require('mongoose');
const { Schema } = mongoose;
const db = require('../../db');

const employeeSchema = new Schema({
  firstName: String,
  lastName: String,
  address1: String,
  address2: String,
  city: String,
  state: String,
  country: String,
  phone: String,
  email: String,
  wage: Schema.Types.Decimal128,
  startDate: String,
  position: String,
  weekHours: Schema.Types.Decimal128,
  isActive: Boolean
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;