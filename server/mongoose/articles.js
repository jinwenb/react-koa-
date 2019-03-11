const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/blog');
const Schema = mongoose.Schema;
let ObjectID = Schema.Types.ObjectId;
const UserSchema = new Schema({
    createAt: {type: Date, default: Date.now},
    user: {
        type: ObjectID,
        ref:'user'
    },
    pv: {
        type: Number,
        default: 0
    },
    content: {type:String},
    title: {type:String},
    connect: [
        {
            user: {
                type: ObjectID,
                ref:'user',
            },
            content: String,
            title: String,
            createAt: {type: Date, default: Date.now},
        }
    ]
});
module.exports = mongoose.model('articles', UserSchema);
