const mongoose = require('mongoose');
const { Schema } = mongoose;
const db = require('../../db');

const taskSchema = new Schema({
  room_id: {type: Schema.Types.ObjectId, ref: 'Room'},
  location: {type: String, required: true},
  taskTitle: {type: String, required: true},
  taskDescription: {type: String, default: ''},
  department: {type: String, required: true},
  createdAt: {type: String, required: true},
  dueBy: {type: String, default: ''},
  completedAt: {type: String, default: ''},
  isComplete: {type: Boolean, default: false},
  isCleaning: {type: Boolean, default: false},
  employeeCreated: {type: String, default: ''},
  employeeCreated_id: {type: String, default: ''},
  employeeAssigned: {type: String, default: ''},
  employeeAssigned_id: {type: String, default: ''},
  employeeCompleted: {type: String, default: ''},
  employeeCompleted_id: {type: String, default: ''}
},
{
  versionKey: false
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;