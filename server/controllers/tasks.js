const Task = require('../../db/models/Task.js');

module.exports = {
  get: (req, res) => {
    const {room_id, roomNumber, isComplete, location, dueBy} = req.query;
    const query = {...(room_id && {room_id}), ...(roomNumber && {roomNumber}), ...(isComplete && {isComplete}), ...(location && {location}), ...(dueBy && {dueBy})}
  },
  post: (req, res) => {

  },
  put: (req, res) => {

  },
  delete: (req, res) => {

  }
};