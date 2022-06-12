const request = require('supertest');
const server = require('../server/server.js');
const { Pool } = require('pg');

describe('testing database queries', () => {
  let testPool;
  let client;

  beforeAll(async () => {
    testPool = new Pool({
      connectionString: process.env.DB_URI
    });
  });

  beforeEach(async () => {
    client = await testPool.connect();
    await client.query('BEGIN');
  });
  
  afterAll(async () => {
    await testPool.end();
  });

  afterEach(async () => {
    await client.query('ROLLBACK');
    client.release();
  });

  it('it should query the database and return a test username', async () => {
    const { rows } = await client.query(`SELECT username FROM users WHERE username = 'testtesttest'`);
    expect(rows[0]["username"]).toEqual("testtesttest");
  })

  it('it should post user succesfully to the database and return a 200 status and application/json content type', async () => {
    const requestBody = {
      user: 'test1',
      score: 7,
      difficulty: 'Easy'
    };

    request(server)
    .post('/submitToLeaderboard')
    .send(requestBody)
    .expect('Content-Type', /application\/json/)
    .expect(200)
  })
});

describe('route integration tests', () => {

    describe('/', () => {
      describe('initial GET request', () => {
        it('it responds with 200 status and text/html content type', () => {
          return request(server)
            .get('/')
            .expect('Content-Type', /text\/html/)
            .expect(200)
      });
    });
  })

  describe('/getLeaderboardScore', () => {
    describe('GET request to leaderboard', () => {
        it('it responds with a 200 status and application/json content type', () => {
            return request(server)
                .get('/getLeaderboardScore')
                .expect('Content-Type', /application\/json/)
                .expect(200)
        }) 
    })
  })
  
})
