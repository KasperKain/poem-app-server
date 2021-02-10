const router = require('express').Router();
const { queries, serialize } = require('./style-service');

// STYLE ROUTES
router
  .route('/')
  // GET ALL STYLES
  .get(async (req, res, next) => {
    try {
      const results = await queries.get(req.app.get('db'));
      res.status(200).json(results);
    } catch (err) {
      res.status(400).json(err);
    }
  })
  // CREATE A STYLE
  .post(async (req, res, next) => {
    try {
      const style = serialize(({ head_style, body_style } = req.body));
      const results = await queries.create(req.app.get('db'), style);
      res.status(201).json(results);
    } catch (err) {
      console.error(err);
    }
  });

router
  .route('/:id')
  // GET A STYLE
  .get(async (req, res, next) => {
    try {
      const results = await queries.get(req.app.get('db'), req.params.id);
      res.status(200).json(results);
    } catch (err) {
      res.status(400).json(err);
    }
  })
  // UPDATE A STYLE
  .put(async (req, res, next) => {
    try {
      const { id } = req.params;
      const { head_style, body_style } = req.body;
      const style = { id, head_style, body_style };
      const results = await queries.update(req.app.get('db'), style);
      res.status(201).json(results);
    } catch (err) {
      res.status(400).json(err);
    }
  })
  // DELETE A STYLE
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
