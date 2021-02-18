const Task = require('../../db/models/Task.js');
const { Rooms } = require('../../db/models/rooms.js');

module.exports = {
  get: (req, res) => {
    const {room_id, location, dueBy} = req.query;
    const isComplete = req.query.isComplete ? req.query.isComplete : false;
    const query = {isComplete, ...(room_id && {room_id}), ...(location && {location}), ...(dueBy && {dueBy})}
    Task.find(query).sort({createdAt: 'desc'}).exec()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        res.sendStatus(500);
      })
  },

  post: (req, res) => {
    const { location, taskTitle, taskDescription, department, employeeCreated, employeeCreated_id, employeeAssigned, employeeAssigned_id, dueBy } = req.body;
    const createdAt = (new Date()).toISOString();
    const query = { taskTitle, location, department, ...(taskDescription && {taskDescription}), employeeCreated, employeeCreated_id, ...(employeeAssigned && {employeeAssigned}), ...(employeeAssigned_id && {employeeAssigned_id}), ...(dueBy && {dueBy}), createdAt, isCleaning: false };
    //check if location is a room, add room_id to query
    Rooms.find({roomNumber: location}).exec()
      .then(result => {
        const room_id = result[0]._id;
        Task.create({ ...query, room_id })
          .then(result => {
            res.status(201).json(result);
          })
          .catch(err => {
            res.sendStatus(500);
          })
      })
      //if location is not a room, room_id is not added
      .catch(() => {
        Task.create(query)
          .then(result => {
            res.status(201).json(result);
          })
          .catch(err => {
            res.sendStatus(500);
          })
      })
  },

  put: (req, res) => {
    const { task_id } = req.params;
    const { employeeCompleted, employeeCompleted_id, isComplete } = req.body;
    const completedAt = (new Date).toISOString();
    const update = { employeeCompleted, employeeCompleted_id, isComplete, completedAt };
    Task.findByIdAndUpdate(task_id, update, {new: true}).exec()
      .then(result => {
        const { room_id, isCleaning } = result;
        //Once a task is complete, check if it is a cleaning task. If so, find room and update isClean status.
        if (isCleaning === true && isComplete === true) {
          Rooms.findByIdAndUpdate(room_id, {isClean: true}).exec()
            .then(() => {
              res.status(201).json(result);
            })
            .catch(err => {
              console.log('Unable to update room isClean status');
              res.status(201).json(result);
            })
        } else {
          res.status(201).json(result);
        }
      })
      .catch(err => {
        res.status(500);
      })
  }
};