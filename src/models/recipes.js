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
 imageUrl: {
     type: String,
    
 },

 /*authorId: {
     type: int
 } */

});

const Recipes = mongoose.model('Recipes', RecipesSchema);
module.exports = Recipes;  