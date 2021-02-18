const mongoose = require('mongoose');
const { Schema, Decimal128 } = mongoose;
const db = require('../../db');
// const { decimal128ToMoneyString } = require('../../server/helpers/reformat.js');

const roomTypesSchema = new Schema({
  roomType: { type: String, unique: true },
  price: { type: Decimal128, default: 0.0 },
  amenities: []
}, {
  versionKey: false
});

module.exports = {

  RoomTypes: mongoose.model('RoomTypes', roomTypesSchema),
  roomTypeMethod: {
    readAll: () => {
      return module.exports.RoomTypes.find().exec();
    },
    readOne: (type) => {
      return module.exports.RoomTypes.findOne({ roomType: type }).exec();
    },
    update: (one) => {
      // let newPrice = decimal128ToMoneyString(one.price);

      return module.exports.RoomTypes.updateMany(
        { roomType: one.roomType },
        {
          roomType: one.roomType,
          price: newPrice,
          amenities: one.amenities,
        },
        { upsert: true }
      );
    },
    deleteOne: (type) => {
      return module.exports.RoomTypes.deleteOne({ roomType: type });
    }
  }
};