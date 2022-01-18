const express = require('express');

const User = require('../models/users');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth');



var validator = require("email-validator");
const { required } = require('joi');



const router = express.Router();

//function generateToken


router.post('/users', async (req, res) => {

    try{
        
        const {email, name, password, role} = req.body;

        if(!name || !email || !password){
            return res.status(400).send({message: 'Invalid entries. Try again.'});
        }

        
        if(!validator.validate(email)){
            return res.status(400).send({message: 'Invalid entries. Try again.'});
        }

        const existingEmail = await User.findOne({ email });
    
        if (existingEmail) {
                return res.status(409).send({message: 'Email already registered'});
        } else if(role == 'user'){
            const user = await User.create(req.body);
            return res.status(201).send({user});
        }


        
   } catch(err){
         
    } 
});

router.post('/login', async (req, res) => {

    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(401).send({message: 'All fields must be filled'});
        }

        
        if(!validator.validate(email)){
            return res.status(401).send({message: 'Incorrect username or password'});
        }

        const user = await User.findOne({email}).select('+password');

        if(user.password != password){
            return res.status(401).send({message: 'Incorrect username or password'});
        } else {

           const token = jwt.sign({id: user.id}, authConfig.secret, {    
                expiresIn: 86400,
            });

            return res.status(201).send ({ token});
        }


        
   } catch(err){
           
    }
});


module.exports = app => app.use('/', router); 