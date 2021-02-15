var mongoose = require('mongoose');
var db = require('../../db');

const roomTypesSchema = mongoose.Schema({
  _id: { type: Number, unique: true },
  roomType: { type: String, unique: true },
  price: Number
});

const RoomTypes = mongoose.model('RoomTypes', roomTypesSchema);

module.exports = {
};