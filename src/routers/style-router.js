const router = require('express').Router();
const { queries, serialize } = require('./style-service');

// STYLE ROUTES
router
  .route('/')
  // GET ALL styleS
  .get(async (req, res, next) => {
    try {
      const results = await queries.get(req.app.get('db'));
      res.status(200).json(results.rows);
    } catch (err) {
      res.status(400).json(err);
    }
  })
  // CREATE A style
  .post(async (req, res, next) => {
    try {
      const style = serialize(({ head_style, body_style } = req.body));
      const results = await queries.create(req.app.get('db'), style);
      res.status(201).json(results.rows[0]);
    } catch (err) {
      console.error(err);
    }
  });

router
  .route('/:id')
  // GET A style
  .get(async (req, res, next) => {
    try {
      const results = await queries.get(req.app.get('db'), req.params.id);
      res.status(200).json(results.rows[0]);
    } catch (err) {
      res.status(400).json(err);
    }
  })
  // UPDATE A style
  .put(async (req, res, next) => {
    try {
      const { id } = req.params;
      const { head_style, body_style } = req.body;
      const style = { id, head_style, body_style };
      const results = await queries.update(req.app.get('db'), style);
      res.status(201).json(results.rows[0]);
    } catch (err) {
      res.status(400).json(err);
    }
  })
  // DELETE A style
  .delete(async (req, res, next) => {
    try {
      const { id } = req.params;
      const results = queries.delete(req.app.get('db'), id);
      res.status(204).json(results);
    } catch (err) {
      res.status(400).json(err);
    }
  });

module.exports = router;
