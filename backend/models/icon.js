const mongoose = require('mongoose');

const iconSchema = new mongoose.Schema({
  data: {type: String,required: true},
  userId: {type:String, required:true, unique:true},
});

module.exports = mongoose.model('icons', iconSchema);