const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/blog');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    userName: {type: String},
    password: String,
    email:String
});
module.exports =  mongoose.model('user', UserSchema);
