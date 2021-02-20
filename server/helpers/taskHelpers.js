const Task = require('../../db/models/Task.js');
const { Rooms } = require('../../db/models/rooms.js');

/**
 * Sets defaults for a system generated cleaning task
 */
const cleanTaskDefault = {
  taskTitle: 'Clean Room',
  department: 'Housekeeping',
  taskDescription: 'Daily Cleaning',
  isCleaning: true,
  employeeCreated: 'system'
};

/**
 * Returns a promise with the newly created cleaning task
 */
const newCleaningTask = (location, room_id) => {
  return Promise.resolve(room_id)
    .then((room_id) => {
      if (!room_id) {
        // If there was no room_id check if location is a room
        return Rooms.find({roomNumber: location});
      } else {
        return Rooms.find({_id: room_id});
      }
    //
    })
    .then((rooms) => {
      // Create new task with cleaning defaults
      let task = Object.assign({}, cleanTaskDefault);
      task.location = location;
      task.createdAt = new Date(Date.now()).toISOString();
      let dueBy = new Date(Date.now());
      dueBy.setHours(15, 0, 0);
      task.dueBy = dueBy.toISOString();

      // If task is for a room add roomNumber and room_id
      if (rooms.length > 0) {
        let room = rooms[0];
        task.location = room.roomNumber;
        task.room_id = room._id;
      }
      // Create the new cleaning task
      task = new Task(task);
      return task.save().exec();
    });
};

module.exports = {
  newCleaningTask
};
