const express = require('express');

const User = require('../models/users');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const uploadImage = require('../middlewares/uploadImages');

const authConfig = require('../config/auth');

const authMiddleware = require('../middlewares/auth')

var validator = require("email-validator");
const { required } = require('joi');
const Recipes = require('../models/recipes');
const { isValidObjectId } = require('mongoose');




const router = express.Router();


router.use(authMiddleware);

router.post('/recipes', async (req, res) => {

    try{
        
        const {name, ingredients, preparation} = req.body;

        if(!req.body.name  || typeof req.body.name == undefined || req.body.name == null){
            return res.status(400).send({message: 'Invalid entries. Try again.'});
        }

        if(!req.body.ingredients  || typeof req.body.ingredients == undefined || req.body.ingredients == null){
            return res.status(400).send({message: 'Invalid entries. Try again.'});
        }

        if(!req.body.preparation  || typeof req.body.preparation == undefined || req.body.preparation == null){
            return res.status(400).send({message: 'Invalid entries. Try again.'});
        } 


       if(req.body.name && req.body.ingredients && req.body.preparation){
            const recipe = await Recipes.create({...req.body, user: req.userId});

        
            return res.status(201).send({recipe});

       }

       
            
   } catch(err){
         
    } 
});

router.get('/recipes', async (req, res) => {

    try{
        const recipe = await Recipes.find();
       
        return res.status(200).send({recipe});


        
   } catch(err){
           
    }
});

router.get('/recipes/:id', async (req, res) => {

    try{
        console.log(req.params);
        const recipe = await Recipes.findById( req.params.id);
       
        return res.status(200).send({recipe});

   } catch(err){
           
    }
});



router.post('/recipes/:id/image', uploadImage.single('image'), async (req, res) => {

    try{


        if(req.file){

            const imagePath = 'http://localhost:3000/uploads/';
            const recipe = await Recipes.findById( req.params.id).populate('user');
            const user = await User.findById(req.userId);
    
            if(recipe.user._id.equals(user._id) || user.role.equals('admin') ){
    
                const image = imagePath.concat(req.file.filename);
                console.log( recipe.imageUrl);

              const updatedRecipe =  await Recipes.findByIdAndUpdate(req.params.id, {
                    image
    
                }, {new: true});
            
                return res.status(200).send({updatedRecipe});
            } 
        }

        

   } catch(err){
           
    }
});

router.put('/recipes/:id', async (req, res) => {

    try{
        
        const {name, ingredients, preparation} = req.body;
        
        const recipe = await Recipes.findById( req.params.id).populate('user');
        const user = await User.findById(req.userId);
       
        if(recipe.user._id.equals(user._id) || user.role.equals('admin') ){
            const updatedRecipe = await Recipes.findByIdAndUpdate(req.params.id, {
                name,
                ingredients,
                preparation

            }, {new: true});
            return res.status(200).send(updatedRecipe);
        } else {
            return res.status(400).send();
        }
       
        

   } catch(err){
           
    }
});

router.delete('/recipes/:id', async (req, res) => {
   
    try{
        const recipe = await Recipes.findById( req.params.id).populate('user');
        const user = await User.findById(req.userId);
       
        if(recipe.user._id.equals(user._id) || user.role.equals('admin') ){
            await Recipes.findByIdAndDelete(req.params.id);
            return res.status(204).send({});
        } else {
            return res.status(400).send();
        }

   } catch(err){
           
    }
});

router.get('/images/{:id}.jpeg',  (req, res) => {
    const imagePath = 'http://localhost:3000/uploads/'.concat(req.params.id);
    return res.status(200).send({imagePath});
               
});

module.exports = app => app.use('/', router); 