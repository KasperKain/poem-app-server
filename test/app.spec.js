const supertest = require('supertest');
const app = require('../src/app');

describe('App', () => {
  it('GET responds with 200 containing "All Good!"', () => {
    return supertest(app).get('/api/').expect(200, 'All Good!');
  });
});
