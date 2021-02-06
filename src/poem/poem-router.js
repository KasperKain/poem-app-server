const router = require('express').Router();
const { queries, serialize } = require('./poem-service');

// POEM ROUTES
router
  .route('/')
  // GET ALL POEMS
  .get(async (req, res, next) => {
    try {
      const results = await queries.get(req.app.get('db'));
      res.status(200).json(results);
    } catch (err) {
      res.status(400).json(err);
    }
  })
  // CREATE A POEM
  .post(async (req, res, next) => {
    try {
      const poem = serialize(({ title, body, style } = req.body));
      const results = await queries.create(req.app.get('db'), poem);
      res.status(201).json(results);
    } catch (err) {
      console.error(err);
    }
  });

router
  .route('/:id')
  // GET A POEM
  .get(async (req, res, next) => {
    try {
      const results = await queries.get(req.app.get('db'), req.params.id);
      res.status(200).json(results);
    } catch (err) {
      res.status(400).json(err);
    }
  })
  // UPDATE A POEM
  .put(async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title, body } = req.body;
      const poem = { id, title, body };
      const results = await queries.update(req.app.get('db'), poem);
      res.status(201).json(results);
    } catch (err) {
      res.status(400).json(err);
    }
  })
  // DELETE A POEM
  .delete(async (req, res, next) => {
    try {
      const { id } = req.params;
      queries
        .delete(req.app.get('db'), id)
        .then((rows) => res.status(204).json(rows));
    } catch (err) {
      res.status(400).json(err);
    }
  });

module.exports = router;
