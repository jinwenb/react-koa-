const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/blog');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name:String
});
module.exports =  mongoose.model('categrories', UserSchema);
