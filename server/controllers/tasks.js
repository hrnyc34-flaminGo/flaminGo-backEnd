const Task = require('../../db/models/Task.js');

module.exports = {
  get: (req, res) => {
    const {room_id, roomNumber, location, dueBy} = req.query;
    const isComplete = req.query.isComplete ? req.query.isComplete : false;
    const query = {isComplete, ...(room_id && {room_id}), ...(roomNumber && {roomNumber}), ...(location && {location}), ...(dueBy && {dueBy})}
    Task.find(query).sort({createdAt: 'desc'})..exec()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        res.sendStatus(500);
      })
  },

  post: (req, res) => {

  },

  put: (req, res) => {

  }
};