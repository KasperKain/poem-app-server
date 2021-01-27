const router = require('express').Router();
const xss = require('xss');

// SANITIZATION
const serialize = (style) => {
  return {
    id: style.id,
    head_style: xss(style.head_style),
    body_style: xss(style.body_style),
  };
};

// SQL QUERIES
const queries = {
  create(db, style) {
    return db.query(
      'INSERT INTO styles (head_style, body_style) VALUES ($1, $2) returning *',
      [style.head_style, style.body_style]
    );
  },
  get(db, id) {
    return !id
      ? db.query('select * from styles')
      : db.query('select * from styles where id = $1', [id]);
  },
  update(db, style) {
    return db.query(
      'UPDATE styles SET head_style = $2, body_style = $3 WHERE id = $1 returning *',
      [style.id, style.head_style, style.body_style]
    );
  },
  delete(db, id) {
    return db.query('DELETE FROM styles WHERE id = $1', [id]);
  },
};

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
