const mongoose = require('mongoose');
const { Schema } = mongoose;
const db = require('../../db');

const RoomTypes = require('../../db/models/roomTypes.js');

const roomsSchema = new Schema({
  reservations_id: { type: Schema.Types.ObjectId, ref: 'Reservations', required: true },
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
},
{
  versionKey: false
});

const Rooms = mongoose.model('Rooms', roomsSchema);

let roomsMethod = {
  read: () => {
    return Rooms.find().exec();
  },
  readOne: (id) => {
    return Rooms.findOne({ '_id': id }).exec();
  },
  update: (one) => {
    return Rooms.updateMany(
      { _id: one._id },
      {
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
  deleteOne: (num) => {
    return Rooms.deleteOne({ roomNumber: num });
  },
};

module.exports = Rooms;
module.exports = roomsMethod;