const request = require('supertest');
const app = require('../../app.js')
const mongoDB = require('../../config/db')
const mongoose = require('mongoose');
const User = require('../../models/userModel.js');
const Task = require("../../models/taskModel");
const dotenv = require('dotenv').config()
const axios = require('axios');
const taskModel = require('../../models/taskModel.js');

describe('taskController', () => {
  let registerResponse;

  beforeAll(async () => {
    await mongoDB.connect();
  });

  beforeEach(async () => {
    registerResponse = await request(app).post("/api/users").send({
      name: 'username',
      email: 'email2@gmail.com',
      password: '123456',
    })
  });

  afterEach(async () => {
    await User.deleteMany({})
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('GET /api/tasks', () => {
    // responds with json
    describe('when user has task', () => {
      test('should respond with a json object ', async () => {
        
        users = await User.find({})

        const task = await Task.create({
          user: registerResponse.body._id,
          text: 'task1',
          targetReps: 10,
          completedReps: 0
        })
        
        const response = await request(app)
          .get("/api/tasks")
          .set('Authorization', 'Bearer ' + registerResponse.body.token)

        expect(response.body.length).toEqual(1)
        expect(response.statusCode).toEqual(200)
        expect(response.headers['content-type']).toContain('application/json')
      });

      describe('when no bearer token', () => {
        test('should respond with 401', async () => {
          const response = await request(app)
              .get("/api/tasks")
          expect(response.statusCode).toEqual(401)
          expect(response.body.message).toEqual('Not authorized, no token')
        });
      });
    });
  });

  describe('POST /api/tasks', () => {
    describe('given text', () => {
      // save the text to the database
  
      // response with the json object of the created task
      
      // should response with status 200
      test("should respond with a 200 status code", async () => {
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
});