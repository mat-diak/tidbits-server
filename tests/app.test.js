const request = require('supertest');
const app = require('../app.js')
const mongoDB = require('../config/db')
const mongoose = require('mongoose');
const User = require('../models/userModel.js');
const dotenv = require('dotenv').config()
const axios = require('axios')

describe('POST /api/tasks', () => {

  beforeAll(async () => {
    await mongoDB.connect();
  });

  afterEach(async () => {
    await User.deleteMany({})
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
  
  describe('given text', () => {
    // save the text to the database

    // response with the json object of the created task
    
    // should response with status 200
    test("should respond with a 200 status code", async () => {
      const registerResponse = await request(app).post("/api/users").send({
        name: 'username',
        email: 'email2@gmail.com',
        password: '123456',
      })

      const response = await request(app)
      .post("/api/tasks")
        .set('Authorization', 'Bearer ' + registerResponse.body.token)
        .send({
          text: 'Some text'
        })
      expect(response.statusCode).toBe(200)
    })

    // should specify json in the content header 
  });

  describe('when text is missing', () => {
    test('responds with status 400', async () => {
      const registerResponse = await request(app).post("/api/users").send({
        name: 'username',
        email: 'email2@gmail.com',
        password: '123456',
      })
  
      const response = await request(app)
        .post("/api/tasks")
        .set('Authorization', 'Bearer ' + registerResponse.body.token)
      expect(response.statusCode).toBe(400)
    });
    
    
    // should response with status code 400 
  });

  describe('when bearer token is missing', () => {
    test('responds with 401 status', async () => {
      const response = await request(app)
        .post("/api/tasks")
        .send({
          text: 'Some text'
        })
      expect(response.statusCode).toBe(401)
    });
  });

});