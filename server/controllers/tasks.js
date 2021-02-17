const Task = require('../../db/models/Task.js');
const { Rooms } = require('../../db/models/rooms.js');
// const ObjectId = require('mongoose').Types.ObjectId;
const cron = require('node-cron');
//Daily Room Cleaning Task auto-generator function at bottom

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
    const query = { taskTitle, location, department, ...(taskDescription && {taskDescription}), employeeCreated, ...(dueBy && {dueBy}), isCleaning: false };
    //check if location is a room, add room_id to query
    Rooms.find({roomNumber: location}).exec()
      .then(result => {
        // const room_id = new ObjectId(result[0]._id);
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
    const { employeeCompleted, isComplete } = req.body;
    const completedAt = (new Date).toISOString();
    const update = { employeeCompleted, isComplete, completedAt };
    Task.findByIdAndUpdate(task_id, update, {new: true}).exec()
      .then(result => {
        const { room_id, isCleaning } = result;
        //Once a task is complete, check if it is a cleaning task. If so, find room and update isClean status.
        if (isCleaning === true && isComplete === true) {
          Rooms.findByIdAndUpdate(room_id, {isClean: true}).exec()
            .then(() => {
              res.sendStatus(201).json(result);
            })
            .catch(err => {
              console.log('Unable to update room isClean status');
              res.sendStatus(201).json(result);
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

//generates room cleaning task everyday at 11pm if room isOccupied: true or isClean: false
cron.schedule('00 23 * * 0,1,2,3,4,5,6,7', () => {
  const createdAt = (new Date()).toISOString();
  let dueBy = new Date();
  //set dueBy to 5pm of the next day
  dueBy = new Date(new Date().getTime() + 1);
  dueBy.setHours(17);
  dueBy = dueBy.toISOString()
  //find rooms that is occupied and not clean
  Rooms.find({$or:[{isOccupied: true}, {isClean: false}]}).exec()
  .then(result => {
      for (const room of result) {
        const { room_id, roomNumber } = room;
        //check if there is already a daily cleaning task associated with room. If so, change its dueBy date to 5pm next day.
        Task.findOneAndUpdate({room_id, isCleaning: true}, {dueBy})
          .then(() => {
            console.log(`Extended Daily Cleaning Task dueBy for Room ${roomNumber}`)
          })
          //if daily cleaning task doesn't exist, create new daily cleaning task.
          .catch(err => {
            const taskTitle = 'Room Housekeeping';
            const taskDescription = 'Perform daily cleaning tasks.'
            const department = 'Housekeeping';
            const isCleaning = true;
            const employeeCreated = 'system'
            Task.create({ room_id, location: roomNumber, taskTitle, taskDescription, department, isCleaning, employeeCreated, createdAt, dueBy})
              .then(() => {
                console.log(`Created Daily Cleaning Task for Room ${roomNumber}`);
              })
              .catch(err => {
                console.log(`Unable to create Daily Cleaning Task for Room ${roomNumber}`);
              })
          })
      }
    })
  //check when isOccupied is true or isClean is false
  // Rooms.find({$or:[{isOccupied: true}, {isClean: false}]}).exec()
  // .then(result => {
  //     for (const room of result) {
  //       const { room_id, roomNumber } = room;
  //       const taskTitle = 'Room Housekeeping';
  //       const taskDescription = 'Perform daily cleaning tasks.'
  //       const department = 'Housekeeping';
  //       const isCleaning = true;
  //       const employeeCreated = 'system'
  //       Task.create({ room_id, location: roomNumber, taskTitle, taskDescription, department, isCleaning, employeeCreated, createdAt, dueBy})
  //         .then(() => {
  //           console.log(`Created Cleaning Task for Room ${roomNumber}`);
  //         })
  //         .catch(err => {
  //           console.log(`Unable to create Cleaning Task for Room ${roomNumber}`);
  //         })
  //     }
  //   })
});

//at 5pm everyday, checks if room isOccupied is true. If true, change room isClean to false.
cron.schedule('00 17 * * 0,1,2,3,4,5,6,7', () => {
  Rooms.updateMany({isOccupied: true}, {isClean: false})
    .then(() => {
      console.log('Property isClean of Room changed to false');
    })
    .catch(err => {
      console.error('No rooms are occupied.')
    })
})