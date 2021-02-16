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
    return Amenities.find().exec();
  },
  readOne: ( id )=>{
    return Amenities.findOne({ _id: id }).exec();
  },
  create: ( one ) => {
    console.log('create:', one);
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