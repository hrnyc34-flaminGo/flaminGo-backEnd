const mongoose = require('mongoose');
const { Schema, Mixed, Decimal128, ObjectId } = mongoose;
const db = require('../../db');
// const { decimal128ToMoneyString } = require('../../server/helpers/reformat.js');

const roomsSchema = new Schema({
  reservations_id: { type: Mixed, default: '' },
  roomType_id: { type: ObjectId, ref: 'RoomTypes', required: true },
  roomNumber: { type: String, unique: true },
  floorNumber: { type: Number },
  roomType: { type: String },
  price: { type: Decimal128, default: 0.0 },
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
    readOne: ( id ) => {
      return module.exports.Rooms.findOne({ _id: id}).exec();
    },
    create: (one) => {
      // let newPrice = decimal128ToMoneyString( one.price );
      return module.exports.Rooms.create(
        {
          reservations_id: one.reservations_id,
          floorNumber: one.floorNumber,
          roomNumber: one.roomNumber,
          roomType: one.roomType,
          price: newPrice,
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
      let newPrice = decimal128ToMoneyString( one.price );

      return module.exports.Rooms.updateMany(
        { _id: one._id },
        {
          reservations_id: one.reservations_id,
          floorNumber: one.floorNumber,
          roomNumber: one.roomNumber,
          roomType: one.roomType,
          price: newPrice,
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