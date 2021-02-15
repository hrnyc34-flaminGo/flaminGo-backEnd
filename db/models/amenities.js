var mongoose = require('mongoose');
var db = require('../../db');

const amenitiesSchema = mongoose.Schema({
  amenity: String
});


const Amenities = mongoose.model('Amenities', amenitiesSchema);

module.exports = {
};