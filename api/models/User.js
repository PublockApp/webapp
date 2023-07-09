const mongoose = require('mongoose');
const {Schema} = mongoose;

//We will input a wallet address into this schema 

const UserSchema = new Schema({
    name: String,
    email: {type:String, unique:true}, 
    password: String,
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;