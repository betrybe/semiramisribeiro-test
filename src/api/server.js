const app = require('./app');
const bodyParser = require('body-parser');
const express = require('express');
const req = require('express/lib/request');

const PORT = 3000;





app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));


