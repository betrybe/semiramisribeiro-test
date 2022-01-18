const app = require('./app');
const bodyParser = require('body-parser');
const express = require('express');
const req = require('express/lib/request');

const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false}));

var usersRouter = require('../controllers/authController');
//app.use('/users', usersRouter);

require('../controllers/authController')(app);

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));


