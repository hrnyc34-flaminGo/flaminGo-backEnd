var mongoose = require('mongoose');
var db = require('../../db');

const amenitiesSchema = mongoose.Schema({
  amenity: { type: String, unique: true }
});

const Amenities = mongoose.model('Amenities', amenitiesSchema);

module.exports = {
  readAll: () => {
    return Amenities.find().exec();
  },
  readOne: ( id )=>{
    return Amenities.findOne({ _id: id }).exec();
  },
  create: (type) => {
    return Amenities.create({
      amenity: type
    });
  },
  deleteOne: ( id )=>{
    return Amenities.deleteOne( { _id: id });
  },
};