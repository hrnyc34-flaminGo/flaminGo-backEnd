const mongoose = require('mongoose');
const { Schema } = mongoose;
const db = require('../../db');

const Amenities = require('../../db/models/amenities.js');

const roomTypesSchema = new Schema({
  roomType: { type: String, unique: true },
  price: Number,
  amenities: []
});

const RoomTypes = mongoose.model('RoomTypes', roomTypesSchema);

let roomTypeMethod = {
  readAll: ( type ) => {
    return RoomTypes.find().exec();
  },
  readOne: ( type ) => {
    return RoomTypes.findOne({ roomType: type }).exec();
  },
  update: (one) => {
    return RoomTypes.updateMany(
      { roomType: one.roomType },
      {
        roomType: one.roomType,
        price: one.price,
        amenities: one.amenities,
      },
      { upsert: true }
    );
  },
  deleteOne: (type) => {
    return RoomTypes.deleteOne({ roomType: type });
  },
};

module.exports = RoomTypes;
module.exports = roomTypeMethod;