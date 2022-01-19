const frisby = require('frisby');
const fs = require('fs');
const { MongoClient } = require('mongodb');

const mongoDbUrl = 'mongodb://localhost:27017/Cookmaster';
const url = 'http://localhost:3000';

describe('auth controller test', () => {

    let connection;
    let db;
  
    beforeAll(async () => {
      connection = await MongoClient.connect(mongoDbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      db = connection.db('Cookmaster');
      await db.collection('users').deleteMany({});
      const users = [
        { name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' }
      ];
      await db.collection('users').insertMany(users);
    });
  
    afterAll(async () => {
      await connection.close();
    });
  
    it('users post', async () => {
        await frisby
        .post(`${url}/users/`,
          {
            name: 'fulano de tal',
            email: 'fulano@email.com',
            password: '12345678',
            role: 'user'  
            
          })
        .expect('status', 200)
        .then((response) => {
          const { body } = response;
          result = JSON.parse(body);
          return frisby
            .setup({
              request: {
                headers: {
                  Authorization: result.token,
                  'Content-Type': 'application/json',
                },
              },
            })

    });
});
