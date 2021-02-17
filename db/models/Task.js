const mongoose = require('mongoose');
const { Schema } = mongoose;
const db = require('../../db');

const taskSchema = new Schema({
  room_id: {type: Schema.Types.ObjectId, ref: 'Room'},
  location: {type: String, required: true},
  taskTitle: {type: String, required: true},
  taskDescription: {type: String, default: ''},
  department: {type: String, required: true},
  isCleaning: {type: Boolean, default: false},
  employeeCreated: {type: String, default: ''},
  createdAt: {type: Date, required: true, default: Date.now},
  dueBy: {type: String, default: ''},
  isComplete: {type: Boolean, default: false},
  employeeCompleted: {type: String, default: ''},
  completedAt: {type: String, default: ''}
},
{
  versionKey: false
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;