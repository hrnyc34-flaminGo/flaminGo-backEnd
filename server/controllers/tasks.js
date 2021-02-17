const Task = require('../../db/models/Task.js');
const { Rooms } = require('../../db/models/rooms.js');
const cron = require('node-cron');

//generates room cleaning task everyday at 11pm if room isOccupied: true or isClean: false
cron.schedule('00 23 * * 0,1,2,3,4,5,6,7', () => {
  const createdAt = (new Date()).toISOString();
  let dueBy = new Date();
  dueBy.setHours(17);
  dueBy = dueBy.toISOString()
  //check when isOccupied is true or isClean is false
  Rooms.find({$or:[{isOccupied: true}, {isClean: false}]}).exec()
  .then(result => {
      for (const room of result) {
        const { room_id, roomNumber } = room;
        const taskTitle = 'Room Housekeeping';
        const taskDescription = 'Perform daily cleaning tasks.'
        const department = 'housekeeping';
        const isCleaning = true;
        const employeeCreated = 'system'
        Task.create({ room_id, location: roomNumber, taskTitle, taskDescription, department, isCleaning, employeeCreated, createdAt, dueBy})
          .then(result => {
            console.log(`Created Cleaning Task for Room ${roomNumber}`);
          })
          .catch(err => {
            console.log(`Unable to create Cleaning Task for Room ${roomNumber}`);
          })
      }
    })
});

module.exports = {
  get: (req, res) => {
    const {room_id, roomNumber, location, dueBy} = req.query;
    const isComplete = req.query.isComplete ? req.query.isComplete : false;
    const query = {isComplete, ...(room_id && {room_id}), ...(roomNumber && {roomNumber}), ...(location && {location}), ...(dueBy && {dueBy})}
    Task.find(query).sort({createdAt: 'desc'}).exec()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        res.sendStatus(500);
      })
  },

  post: (req, res) => {
    const { taskTitle, location, department, taskDescription, employeeCreated, dueBy } = req.body;
    const query = { room_id, taskTitle, location, department, ...(taskDescription && {taskDescription}), employeeCreated, ...(dueBy && {dueBy}), isCleaning: false };
    //if location is a room, add room_id to query
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
      //if location is not a room
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
    const { employeeCompleted, isComplete } = req.body;
    const completedAt = (new Date).toISOString();
    const update = { employeeCompleted, isComplete, completedAt };
    Task.findByIdAndUpdate(task_id, update, {new: true}).exec()
      .then(result => {
        const { room_id, isCleaning } = result;
        //Once a task is complete, check if it is a cleaning task. If so, update room isClean status.
        if (isCleaning === true && isComplete === true) {
          Rooms.findByIdAndUpdate(room_id, {isClean: true}).exec()
            .then(() => {
              res.status(201).json(result);
            })
            .catch(err => {
              console.log('Unable to update room isClean status');
            })
        } else {
          res.sendStatus(201).json(result);
        }
      })
      .catch(err => {
        res.sendStatus(500);
      })
  }
};