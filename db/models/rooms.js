var mongoose = require('mongoose');
var db = require('../../db');

const roomsSchema = mongoose.Schema({
  reservation_id: Number, // currentGuests: [],
  tasks_id: Number, // tasks: [ {taskTitle: String, department: String} ]

  roomType_id: Number, // roomType: String, price: Number,
  amenities_id: Number, // amenities: [],

  roomNumber: String,
  floorNumber: Number,

  roomType: String,
  price: Number,

  amenities: [],
  isClean: Boolean,
  isOccupied: Boolean,
  isUsable: Boolean,
  currentGuests: [],
  tasks: []
});


const Rooms = mongoose.model('Rooms', roomsSchema);

module.exports = {
};