const request = require('supertest');
const server = require('../server/server.js');
import { jest } from'@jest/globals';

describe('Route integration', () => {

    describe('/', () => {
      describe('GET', () => {
        it('responds with 200 status and text/html content type', () => {
          return request(server)
            .get('/')
            .expect('Content-Type', /text\/html/)
            .expect(200)
      });
    });
  })

  describe('/getLeaderboardScore', () => {
    describe('GET', () => {
        it('responds with a 200 status and application/json content type', () => {
            return request(server)
                .get('/getLeaderboardScore')
                .expect('Content-Type', /application\/json/)
                .expect(200)
        }) 
    })
  })

  describe('/submitToLeaderboard', () => {
    describe('POST', () => {
        beforeAll(() => {
            const mockDb = new server
        })

        xit('responds with a 200 status and application/json content type', () => {
            const requestBody = {
                user: 'testtestest',
                score: 1,
                difficulty: 'Easy'
            };
            return request(server)
                .post('/submitToLeaderboard')
                .send(requestBody)
                .expect('Content-Type', /application\/json/)
                .expect(200)
        })
    })
  })



})
