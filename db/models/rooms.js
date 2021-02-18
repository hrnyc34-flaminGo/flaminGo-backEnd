const mongoose = require('mongoose');
const { Schema, Types, Mixed} = mongoose;
const db = require('../../db');
const RoomTypes = require('./roomTypes.js');

const roomsSchema = new Schema({
  reservation_id: { type: Mixed, default: '' },
  roomType_id: { type: Types.ObjectId, ref: 'RoomTypes' },
  roomNumber: { type: String, unique: true },
  floorNumber: { type: Number },
  isClean: { type: Boolean, default: true },
  isOccupied: { type: Boolean, default: false },
  isUsable: { type: Boolean, default: true },
}, {
  versionKey: false
});

roomsSchema.statics.getRooms = function(query = {}) {
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
    readOne: (query = { _id: id }) => {
      return module.exports.Rooms.findOne({ query }).exec();
    },
    create: (one) => {
      return module.exports.Rooms.create(
        {
          reservation_id: one.reservations_id,
          roomType_id: one.roomType_id,
          floorNumber: one.floorNumber,
          roomNumber: one.roomNumber,
          isClean: one.isClean,
          isOccupied: one.isOccupied,
          isUsable: one.isUsable,
        }
      );
    },
    update: (one) => {
      return module.exports.Rooms.updateMany(
        { _id: one._id },
        {
          reservation_id: one.reservations_id,
          roomType_id: one.roomType_id,
          floorNumber: one.floorNumber,
          roomNumber: one.roomNumber,
          isClean: one.isClean,
          isOccupied: one.isOccupied,
          isUsable: one.isUsable,
        },
        { upsert: true }
      );
    },
    deleteOne: (type) => {
      return module.exports.Rooms.deleteOne({ roomType: type });
    },
  }
};