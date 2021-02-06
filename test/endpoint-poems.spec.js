const { expect } = require('chai');
const knex = require('knex');
const supertest = require('supertest');
const app = require('../src/app');
const { makePoemsArray, makeStylesArray } = require('./fixtures');

describe('Poem Endpoints', () => {
  let db;
  let testPoems = makePoemsArray();

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    });

    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  // Cleaning
  before('clean the table', () =>
    db.raw('TRUNCATE poems, styles RESTART IDENTITY CASCADE')
  );
  afterEach('cleanup', () =>
    db.raw('TRUNCATE poems, styles RESTART IDENTITY CASCADE')
  );

  context('Given there are poems in the database', () => {
    beforeEach('insert styles', () => {
      return db.into('styles').insert(makeStylesArray());
    });
    beforeEach('insert poems', () => {
      return db.into('poems').insert(testPoems);
    });

    it('"GET POEMS" responds with 200 containing poems', () => {
      return supertest(app).get('/api/poems').expect(200, testPoems);
    });

    it('"GET PEOMS/ID" responds with 200 containing second poem', () => {
      const id = 2;
      return supertest(app).get(`/api/poems/${id}`).expect(200, testPoems[1]);
    });

    it('"POST /POEMS" responds with 201 containing a new poem', () => {
      const newPoem = {
        title: 'new title',
        id: 4,
        body: 'new body',
        style: 2,
      };
      return supertest(app)
        .post('/api/poems')
        .send(newPoem)
        .expect(201)
        .then((res) => expect(res.body.title).to.eql(newPoem.title));
    });

    it('"DELETE /POEMS/ID" returns 204 and removes a poem by ID', () => {
      const testPoemId = testPoems[1].id;

      return supertest(app)
        .delete(`/api/poems/${testPoemId}`)
        .send()
        .expect(204)
        .then(() => {
          supertest(app)
            .get('/api/poems')
            .then((poems) => {
              expect(poems.body).to.eql(
                testPoems.filter((poem) => poem.id !== testPoemId)
              );
            });
        });
    });

    it('"PUT /POEMS/ID" responds with 201 and updates a poem', () => {
      const testPoem = testPoems[0];
      const updatedPoem = testPoem;
      updatedPoem.title = 'newer title';
      updatedPoem.body = 'newer body';
      return supertest(app)
        .put(`/api/poems/${testPoem.id}`)
        .send(updatedPoem)
        .expect(201)
        .then(() => {
          supertest(app)
            .get(`api/poems/${testPoem.id}`)
            .then((poem) => expect(poem).to.eql(updatedPoem));
        });
    });
  });
});
