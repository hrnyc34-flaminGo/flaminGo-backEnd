var mongoose = require('mongoose');
var db = require('../../db');
const table = 'examples';

console.log(`connected to collection : "${table}"!`);

var exampleSchema = mongoose.Schema({
});

var Examples = mongoose.model('Examples', exampleSchema);

const dbMethods = {
  read: ()=>{
  },
  update: () => {
  },
  deleteOne: ()=>{
  }
};

module.exports = dbMethods;