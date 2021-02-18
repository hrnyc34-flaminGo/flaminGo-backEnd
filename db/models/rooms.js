const mongoose = require('mongoose');
const { Schema, Mixed, Types } = mongoose;
const db = require('../../db');
const RoomTypes = require('./roomTypes.js');

const roomsSchema = new Schema({
  reservations_id: { type: Mixed, default: '' },
  roomType_id: { type: Types.ObjectId, ref: 'RoomTypes' },
  roomNumber: { type: String, unique: true },
  floorNumber: { type: Number },
  roomType: { type: String },
  price: { type: Number },
  amenities: [],
  isClean: { type: Boolean, default: false },
  isOccupied: { type: Boolean, default: false },
  isUsable: { type: Boolean, default: false },
  currentGuests: [],
  tasks: []
}, {
  versionKey: false
});

module.exports = {
  Rooms: mongoose.model('Rooms', roomsSchema),

  roomsMethod: {
    readAll: () => {
      return module.exports.Rooms.find().exec();
    },
    readOne: (id) => {
      return module.exports.Rooms.findOne({ _id: id }).exec();
    },
    create: (one) => {
      return module.exports.Rooms.create(
        {
          reservations_id: one.reservations_id,
          floorNumber: one.floorNumber,
          roomNumber: one.roomNumber,
          roomType: one.roomType,
          price: one.price,
          amenities: one.amenities,
          isClean: one.isClean,
          isOccupied: one.isOccupied,
          isUsable: one.isUsable,
          currentGuests: one.currentGuests,
          tasks: one.tasks
        }
      );
    },
    update: (one) => {
      return module.exports.Rooms.updateMany(
        { _id: one._id },
        {
          reservations_id: one.reservations_id,
          floorNumber: one.floorNumber,
          roomNumber: one.roomNumber,
          roomType: one.roomType,
          price: one.price,
          amenities: one.amenities,
          isClean: one.isClean,
          isOccupied: one.isOccupied,
          isUsable: one.isUsable,
          currentGuests: one.currentGuests,
          tasks: one.tasks
        },
        { upsert: true }
      );
    },
    deleteOne: (type) => {
      return module.exports.Rooms.deleteOne({ roomType: type });
    },
  }
};