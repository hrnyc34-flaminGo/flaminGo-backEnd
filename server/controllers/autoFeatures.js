const Task = require('../../db/models/Task.js');
const { Rooms } = require('../../db/models/rooms.js');
const cron = require('node-cron');

//at 5pm everyday, checks if room isOccupied is true. If true, change room isClean to false.
cron.schedule('00 17 * * 0,1,2,3,4,5,6,7', () => {
  Rooms.updateMany({isOccupied: true}, {isClean: false})
    .then(() => {
      console.log('Property isClean of Room changed to false');
    })
    .catch(err => {
      console.error('No rooms are occupied.');
    });
});

//generates room cleaning task everyday at 11pm if room isOccupied: true or isClean: false
cron.schedule('00 23 * * 0,1,2,3,4,5,6,7', () => {
  const createdAt = (new Date()).toISOString();
  let dueBy = new Date();
  //set dueBy to next day
  dueBy.setDate(dueBy.getDate() + 1);
  //set dueBy to 5pm
  dueBy.setHours(17, 0, 0, 0);
  dueBy = dueBy.toISOString();
  //find rooms that are occupied or not clean
  Rooms.find({$or:[{isOccupied: true}, {isClean: false}]}).exec()
    .then(result => {
      //loop through each room, update an existing Daily Cleaning Task or create a Daily Cleaning Task
      for (const room of result) {
        const { _id, roomNumber } = room;
        //check if there is already a daily cleaning task associated with room. If so, change its dueBy date to 5pm next day.
        Task.findOneAndUpdate({room_id: _id, isCleaning: true}, {dueBy})
          .then(taskFindResult => {
            console.log(`Extended Daily Cleaning Task ${taskFindResult._id}, dueBy status to ${dueBy} for Room ${roomNumber}, id ${_id}`);
          })
          //if daily cleaning task doesn't exist, create new daily cleaning task.
          .catch(err => {
            const taskTitle = 'Daily Housekeeping';
            const taskDescription = 'Perform daily cleaning tasks.';
            const department = 'Housekeeping';
            const isCleaning = true;
            const employeeCreated = 'system';
            Task.create({room_id: _id, location: roomNumber, taskTitle, taskDescription, department, isCleaning, employeeCreated, createdAt, dueBy})
              .then(taskCreateResult => {
                console.log(`Created Daily Cleaning Task ${taskCreateResult._id} for Room ${roomNumber}, id ${_id}`);
              })
              .catch(err => {
                console.log(`Unable to create Daily Cleaning Task for Room ${roomNumber}`);
              });
          });
      }
    })
    .catch(err => {
      console.error(`Did not auto-generate Daily Cleaning Tasks for ${new Date}`);
    });
});