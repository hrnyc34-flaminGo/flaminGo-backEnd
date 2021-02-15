const mongoose = require('mongoose');
const { Schema } = mongoose;
const db = require('../../db');

const timesheetSchema = new Schema({
  employee_id: {type: String, required: true},
  monday: {type: Number, default: 0},
  tuesday: {type: Number, default: 0},
  wednesday: {type: Number, default: 0},
  thursday: {type: Number, default: 0},
  friday: {type: Number, default: 0},
  saturday: {type: Number, default: 0},
  sunday: {type: Number, default: 0},
  weekStart: {type: String, default: null},
  weekEnd: {type: String, default: null}
},
{
  versionKey: false
});

const Timesheet = mongoose.model('Timesheet', timesheetSchema);

module.exports = Timesheet;