const mongoose = require('mongoose');
const { Schema, Types, Mixed} = mongoose;
const db = require('../../db');
const RoomTypes = require('./roomTypes.js');

const roomsSchema = new Schema({
  reservation_id: { type: Mixed, default: '' },
  roomType_id: { type: Types.ObjectId, ref: 'RoomTypes' },
  roomNumber: { type: String, unique: true },
  floorNumber: { type: Number },
  roomType: { type: String },
  price: { type: Number },
  amenities: [],
  isClean: { type: Boolean, default: true },
  isOccupied: { type: Boolean, default: false },
  isUsable: { type: Boolean, default: true },
  currentGuests: [],
  tasks: []
}, {
  versionKey: false
});

roomsSchema.statics.getAllRooms = function(query = {}) {
  const pipeline = [
    { $match: query },
    {
      $lookup: {
        from: 'roomtypes',
        localField: 'roomType_id',
        foreignField: '_id',
        as: 'add'
      }
    }, {
      $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$add', 0] }, '$$ROOT'] } }
    }, {
      $project: { add: 0 }
    }];

  return this.aggregate(pipeline).sort({roomNumber: 1}).exec();
};


module.exports = {
  Rooms: mongoose.model('Rooms', roomsSchema),

  roomsMethod: {
    readOne: (id) => {
      return module.exports.Rooms.findOne({ _id: id }).exec();
    },
    create: (one) => {
      return module.exports.Rooms.create(
        {
          reservation_id: one.reservations_id,
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
          reservation_id: one.reservations_id,
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