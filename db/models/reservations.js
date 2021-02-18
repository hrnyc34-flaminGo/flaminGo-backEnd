const mongoose = require('mongoose');
const { Schema, ObjectId, Mixed, Decimal128 } = mongoose;
const db = require('../../db');

const reservationsSchema = new Schema(
  {
    _id: {type: ObjectId, required: true},
    idString: {type: String, required: true},
    bookingGuest: { type: Object, required: true },
    room_id: { type: Mixed, default: '' },
    roomType_id: { type: ObjectId, required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    guestList: { type: Array, default: [] },
    totalCost: { type: Decimal128, default: 0.0 },
  },
  {
    versionKey: false,
  }
);

reservationsSchema.statics.searchReservations = function (query = {}) {
  const pipeline = [
    { $match: query },
    {
      $lookup: {
        from: 'rooms',
        localField: 'room_id',
        foreignField: '_id',
        as: 'room',
      },
    },
    {
      $lookup: {
        from: 'roomtypes',
        localField: 'roomType_id',
        foreignField: '_id',
        as: 'roomTypeObj',
      },
    },
    {
      $set: {
        roomType: { $arrayElemAt: ['$roomTypeObj', 0] },
        roomNumber: { $ifNull: [{ $arrayElemAt: ['$room', 0] }, ''] },
      },
    },
    {
      $set: {
        roomNumber: '$roomNumber.roomNumber',
        roomType: '$roomType.roomType',
      },
    },
    {
      $project: {
        room: 0,
        roomTypeObj: 0,
      },
    },
  ];

  return this.aggregate(pipeline).sort({checkIn: -1});
};

const Reservation = mongoose.model('Reservation', reservationsSchema);

module.exports = Reservation;
