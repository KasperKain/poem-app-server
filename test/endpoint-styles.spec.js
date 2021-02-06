const { expect } = require('chai');
const knex = require('knex');
const supertest = require('supertest');
const app = require('../src/app');
const { makeStylesArray } = require('./fixtures');

describe('Style Endpoints', () => {
  let db;
  let testStyles = makeStylesArray();

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    });

    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  // Cleaning
  before('clean the table', () => db('styles').delete());
  afterEach('cleanup', () => db('styles').delete());

  context('Given there are styles in the database', () => {
    beforeEach('insert styles', () => {
      return db.into('styles').insert(testStyles);
    });

    it('"GET STYLES" responds with 200 containing styles', () => {
      return supertest(app).get('/api/styles').expect(200, testStyles);
    });

    it('"GET STYLES/ID" responds with 200 containing second style', () => {
      const id = 2;
      return supertest(app).get(`/api/styles/${id}`).expect(200, testStyles[1]);
    });

    it('"POST /STYLES" responds with 201 containing a new style', () => {
      const newstyle = {
        id: 4,
        head_style: 'mood_peace',
        body_style: 'temp_hot',
      };
      return supertest(app)
        .post('/api/styles')
        .send(newstyle)
        .expect(201)
        .then((res) => expect(res.body.head_style).to.eql(newstyle.head_style));
    });

    it('"DELETE /STYLES/ID" returns 204 and removes a style by ID', () => {
      const teststyleId = testStyles[1].id;

      return supertest(app)
        .delete(`/api/styles/${teststyleId}`)
        .send()
        .expect(204)
        .then(() => {
          supertest(app)
            .get('/api/styles')
            .then((styles) => {
              expect(styles.body).to.eql(
                testStyles.filter((style) => style.id !== teststyleId)
              );
            });
        });
    });

    it('"PUT /STYLES/ID" responds with 201 and updates a style', () => {
      const teststyle = testStyles[0];
      const updatedstyle = teststyle;
      updatedstyle.head_style = 'mood_anger';
      updatedstyle.body_style = 'temp_cool';
      return supertest(app)
        .put(`/api/styles/${teststyle.id}`)
        .send(updatedstyle)
        .expect(201)
        .then(() => {
          supertest(app)
            .get(`api/styles/${teststyle.id}`)
            .then((style) => expect(style).to.eql(updatedstyle));
        });
    });
  });
});
