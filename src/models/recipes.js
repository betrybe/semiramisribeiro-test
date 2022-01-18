const mongoose = require('../database');

const RecipesSchema = new mongoose.Schema({
name: {
    type: String,
    required: true,
},

ingredients: {
    type: String,
    unique: true,
    required: true,
},
preparation:{
    type: String,
    required: true,
},
 imageUrl: {
     type: String,
    
 },

 /*authorId: {
     type: int
 } */

});

const User = mongoose.model('User', Userschema);
module.exports = User;  