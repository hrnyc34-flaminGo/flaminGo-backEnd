const mongoose = require('mongoose');
const { Schema } = mongoose;
const db = require('../../db');

const timesheetSchema = new Schema({
  employee_id: String,
  monday: Number,
  tuesday: Number,
  wednesday: Number,
  thursday: Number,
  friday: Number,
  saturday: Number,
  sunday: Number,
  weekStart: String,
  weekEnd: String
});

const Timesheet = mongoose.model('Timesheet', timesheetSchema);

module.exports = Timesheet;