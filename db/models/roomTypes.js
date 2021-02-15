var mongoose = require('mongoose');
var db = require('../../db');

const roomTypesSchema = mongoose.Schema({
  roomType: String,
  price: Number
});

const RoomTypes = mongoose.model('RoomTypes', roomTypesSchema);

module.exports = {
};