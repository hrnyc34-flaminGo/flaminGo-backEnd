const mongoose = require('mongoose');
const { Schema } = mongoose;
const db = require('../../db');

const amenitiesSchema = new Schema({
  amenity: { type: String, unique: true }
}, {
  versionKey: false
});

const Amenities = mongoose.model('Amenities', amenitiesSchema);

let amenitiesMethod = {
  readAll: () => {
    console.log('readAll working');
    return Amenities.find().exec();
  },
  readOne: ( id )=>{
    return Amenities.findOne({ _id: id }).exec();
  },
  create: ( one ) => {
    return Amenities.create({
      amenity: one.amenity
    });
  },
  deleteOne: ( id )=>{
    return Amenities.deleteOne( { _id: id });
  },
};

module.exports = Amenities;
module.exports = amenitiesMethod;