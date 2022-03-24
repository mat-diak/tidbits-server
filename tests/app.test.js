const request = require('supertest');
const app = require('../app.js')
const connectDB = require('../config/db')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

describe('POST /api/tasks', () => {

  beforeEach(() => {
    connectDB(process.env.MONGO_TEST_URI);
  });

  afterAll(() => {
    mongoose.connection.close();
  });
  
  describe('given text', () => {
    // save the text to the database

    // response with the json object of the created task
    
    // should response with status 200
    test("should respond with a 200 status code", async () => {
      const response = await request(app).post("/api/tasks").send({
        text: 'Some text'
      })
      expect(response.statusCode).toBe(200)
    })

    test('should respond with status code 200', async () => {
      const response = await request(app).post('/api/tasks').send({
        text: 'Task text'
      })
      expect(response.statusCode).toEqual(200)
    })

    // should specify json in the content header 
  });

  describe('when text is missing', () => {
    // should response with status code 400 
  });

});