const request = require('supertest');
const server = require('../server/server.js');
const { Pool } = require('pg');

describe('testing postgres connection', () => {
  let testPool;

  beforeAll(() => {
      testPool = new Pool({
          connectionString: process.env.DB_URI
      });
  });

  afterAll(async () => {
      await testPool.end();
  });

  it('should test database connection', async () => {
      const client = await testPool.connect();
      try {
          await client.query('BEGIN');

          const { rows } = await client.query(`SELECT 1 as "result"`);
          expect(rows[0]["result"]).toBe(1);

          await client.query('ROLLBACK');
      } catch(err) {
        throw err;
      } finally {
          client.release();
      }
  })

  it('should retrieve test user', async () => {
    const client = await testPool.connect();
    try {
        await client.query('BEGIN');

        const { rows } = await client.query(`SELECT username FROM users WHERE username = 'testtesttest'`);
        expect(rows[0]["username"]).toEqual("testtesttest");

        await client.query('ROLLBACK');
    } catch(err) {
      throw err;
    } finally {
        client.release();
    }
  })

  it('should post user succesfully', async () => {
    const client = await testPool.connect();
    try {
        await client.query('BEGIN');

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

        await client.query('ROLLBACK');
    } catch(err) {
      throw err;
    } finally {
        client.release();
    }
  })
});

describe('Route integration', () => {
    describe('/', () => {
      describe('initial GET request', () => {
        it('responds with 200 status and text/html content type', () => {
          return request(server)
            .get('/')
            .expect('Content-Type', /text\/html/)
            .expect(200)
      });
    });
  })

  describe('/getLeaderboardScore', () => {
    describe('GET request for leaderboard', () => {
        it('responds with a 200 status and application/json content type', () => {
            return request(server)
                .get('/getLeaderboardScore')
                .expect('Content-Type', /application\/json/)
                .expect(200)
        }) 
    })
  })

  // describe('/submitToLeaderboard', () => {
  //   describe('POST', () => {
  //       it('responds with a 200 status and application/json content type', () => {
  //           const requestBody = {
  //               user: 'testtesttest',
  //               score: 7,
  //               difficulty: 'Easy'
  //           };
  //           return request(server)
  //               .post('/submitToLeaderboard')
  //               .send(requestBody)
  //               .expect('Content-Type', /application\/json/)
  //               .expect(200)
  //       })
  //   })
  // })
  


})
