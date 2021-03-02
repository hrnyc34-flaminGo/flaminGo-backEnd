const mongoose = require('mongoose');
const { Schema, Decimal128 } = mongoose;
const db = require('../../db');

const roomTypesSchema = new Schema({
  roomType: { type: String, unique: true },
  price: { type: Decimal128, default: 0.00 },
  amenities: []
}, {
  versionKey: false
});

roomTypesSchema.statics.readAll = function() {
  return this.find({}).exec();
},

roomTypesSchema.statics.readOne = function( type ) {
  return this.findOne({ roomType: type }).exec();
},

roomTypesSchema.statics.createOne = function( one ) {
  return this.create(
    {
      roomType: one.roomType,
      price: one.price,
      amenities: one.amenities,
    }
  );
},

roomTypesSchema.statics.deleteOne = function( type ) {
  return this.deleteOne({ roomType: type });
};

const RoomTypes = mongoose.model( 'RoomTypes', roomTypesSchema );

module.exports = RoomTypes;
