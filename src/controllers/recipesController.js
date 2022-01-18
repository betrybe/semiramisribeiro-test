const express = require('express');

const User = require('../models/recipes');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth');

const authMiddleware = require('../middlewares/auth')

var validator = require("email-validator");
const { required } = require('joi');
const Recipes = require('../models/recipes');



const router = express.Router();


router.use(authMiddleware);

router.post('/recipes', async (req, res) => {

    try{
        
        const {name, ingredients, preparation} = req.body;


        if(!name){
            return res.status(400).send({message: 'Invalid entries. Try again.'});
        }

        if(!name || !ingredients || !preparation){
            return res.status(400).send({message: 'Invalid entries. Try again.'});
        }

        
       const recipe = await Recipes.create(req.body);
       
       return res.status(200).send({recipe});
       
            
   } catch(err){
         
    } 
});

router.get('/recipes', async (req, res) => {

    try{
        const recipe = await Recipes.find();
       
        return res.status(201).send({recipe});


        
   } catch(err){
           
    }
});

router.get('/recipes/:id', async (req, res) => {

    try{
        console.log(req.params);
        const recipe = await Recipes.findById( req.params.id);
       
        return res.status(201).send({recipe});

   } catch(err){
           
    }
});

router.put('/recipes/:id', async (req, res) => {

    try{
        
        //FALTA FAZER
        const recipe = await Recipes.findByIdAndUpdate( req.params.id);
       
        return res.status(201).send({recipe});

   } catch(err){
           
    }
});

router.post('/recipes/:id', async (req, res) => {


    //FALTA FAZER USUARIO ADMIN E VERIFICAR SE PERTENCE AO USUÁRIO QUE CRIOU
    try{
        
        await Recipes.findByIdAndDelete( req.params.id);
       
        return res.status(204).send({});

   } catch(err){
           
    }
});





module.exports = app => app.use('/', router); 