var mongoose = require('mongoose');
var db = require('../../db');
const table = 'examples';

console.log(`connected to collection : "${table}"!`);

const exampleSchema = mongoose.Schema({
  name: {type: String, unique: true}
});

const Example = mongoose.model('Example', exampleSchema);


module.exports = {
  readAll: ()=>{},
  create: ()=>{}
};