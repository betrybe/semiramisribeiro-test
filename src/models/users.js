const mongoose = require('../database');

const Userschema = new mongoose.Schema({
name: {
    type: String,
    required: true,
},

email: {
    type: String,
    unique: true,
    required: true,
},
password:{
    type: String,
    required: true,
},
 role: {
     type: String,
     required: false,
     default: 'user',

 }

});

const User = mongoose.model('User', Userschema);
module.exports = User;  