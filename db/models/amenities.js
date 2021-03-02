const mongoose = require('mongoose');
const { Schema } = mongoose;
const db = require('../../db');

const amenitiesSchema = new Schema({
  amenity: { type: String, unique: true }
}, {
  versionKey: false
});

amenitiesSchema.statics.readAll = function() {
  return this.find({}).exec();
},

amenitiesSchema.statics.readOne = function( name ) {
  return this.findOne({ amenity: name }).exec();
},

amenitiesSchema.statics.create = function( one ) {
  return this.updateMany(
    { amenity: one.amenity },
    {
      amenity: one.amenity
    },
    { upsert: true }
  );
},

amenitiesSchema.statics.deleteOne = function( id ) {
  return this.deleteOne( { _id: id });
};

const Amenities = mongoose.model('Amenities', amenitiesSchema);

module.exports = Amenities;