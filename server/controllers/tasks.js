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

// //generates room cleaning task everyday at 11pm if room isOccupied: true or isClean: false
// cron.schedule('26 11 * * 0,1,2,3,4,5,6,7', () => {
//   const createdAt = (new Date()).toISOString();
//   let dueBy = new Date();
//   console.log(dueBy)
//   //set dueBy to next day
//   dueBy.setDate(dueBy.getDate() + 1)
//   //set dueBy to 5pm
//   dueBy.setHours(17, 0, 0, 0);
//   dueBy = dueBy.toISOString()
//   //find rooms that are occupied or not clean
//   Rooms.find({$or:[{isOccupied: true}, {isClean: false}]}).exec()
//   .then(result => {
//       //loop through each room, update an existing Daily Cleaning Task or create a Daily Cleaning Task
//       for (const room of result) {
//         const { _id, roomNumber } = room;
//         //check if there is already a daily cleaning task associated with room. If so, change its dueBy date to 5pm next day.
//         Task.findOneAndUpdate({room_id: _id, isCleaning: true}, {dueBy})
//           .then(taskFindResult => {
//             console.log(`Extended Daily Cleaning Task ${taskFindResult._id}, dueBy status to ${dueBy} for Room ${roomNumber}, id ${_id}`)
//           })
//           //if daily cleaning task doesn't exist, create new daily cleaning task.
//           .catch(err => {
//             const taskTitle = 'Daily Housekeeping';
//             const taskDescription = 'Perform daily cleaning tasks.'
//             const department = 'Housekeeping';
//             const isCleaning = true;
//             const employeeCreated = 'system'
//             Task.create({ room_id: _id, location: roomNumber, taskTitle, taskDescription, department, isCleaning, employeeCreated, createdAt, dueBy})
//               .then(taskCreateResult => {
//                 console.log(`Created Daily Cleaning Task ${taskCreateResult._id} for Room ${roomNumber}, id ${_id}`);
//               })
//               .catch(err => {
//                 console.log(`Unable to create Daily Cleaning Task for Room ${roomNumber}`);
//               })
//           })
//       }
//     })
//     .catch(err => {
//       console.error(`Did not auto-generate Daily Cleaning Tasks for ${new Date}`)
//     })
// });

// //at 5pm everyday, checks if room isOccupied is true. If true, change room isClean to false.
// cron.schedule('00 17 * * 0,1,2,3,4,5,6,7', () => {
//   Rooms.updateMany({isOccupied: true}, {isClean: false})
//     .then(() => {
//       console.log('Property isClean of Room changed to false');
//     })
//     .catch(err => {
//       console.error('No rooms are occupied.')
//     })
// })