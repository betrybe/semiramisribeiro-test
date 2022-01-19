// colocar query do MongoDB
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');

const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster';
const DB_NAME = 'Cookmaster';

mongoose.connect(MONGO_DB_URL, function(err, db){
    if (err) throw err;
    const dbo = db.db(DB_NAME);
    var novoUser = { name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' };
    dbo.collection("users").insertOne(novoUser, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    }
)});



