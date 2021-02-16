const mongoose = require('mongoose');
const { Schema } = mongoose;
const db = require('../../db');

const taskSchema = new Schema({
  room_id: {type: Schema.Types.ObjectId, ref: 'Room'},
  location: {type: String, required: true},
  taskTitle: {type: String, required: true},
  department: {type: String, required: true},
  taskDescription: String,
  isCleaning: {type: String, required: true},
  employeeCreated: {type: String, required: true},
  createdAt: {type: String, required: true},
  dueBy: {type: String, default: ''},
  isCompleted: {type: Boolean, default: false},
  employeeCompleted: {type: String, default: ''},
  completedAt: {type: String, default: ''}
},
{
  versionKey: false
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;