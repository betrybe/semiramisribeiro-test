const mongoose = require('../database');

const RecipesSchema = new mongoose.Schema({
name: {
    type: String,
    required: true,
},

ingredients: {
    type: String,
    required: true,
},
preparation:{
    type: String,
    required: true,
},
 image: {
     type: String,
    
 },

 user: {
     type: mongoose.Schema.Types.ObjectId,
     ref:'User',
     require: true,

 } 

});

const Recipes = mongoose.model('Recipes', RecipesSchema);
module.exports = Recipes;  