const router = require('express').Router();
const xss = require('xss');

// SANITIZATION
const serialize = (poem) => {
  return {
    id: poem.id,
    title: xss(poem.title),
    body: xss(poem.body),
  };
};

// SQL QUERIES
const queries = {
  create(db, poem) {
    return db.query(
      'INSERT INTO poems (title, body) VALUES ($1, $2) returning *',
      [poem.title, poem.body]
    );
  },
  get(db, id) {
    return !id
      ? db.query('select * from poems')
      : db.query('select * from poems where id = $1', [id]);
  },
  update(db, poem) {
    return db.query(
      'UPDATE poems SET title = $2, body = $3 WHERE id = $1 returning *',
      [poem.id, poem.title, poem.body]
    );
  },
  delete(db, id) {
    return db.query('DELETE FROM poems WHERE id = $1', [id]);
  },
};

// POEM ROUTES
router
  .route('/')
  // GET ALL POEMS
  .get(async (req, res, next) => {
    try {
      const results = await queries.get(req.app.get('db'));
      res.status(200).json(results.rows);
    } catch (err) {
      res.status(400).json(err);
    }
  })
  // CREATE A POEM
  .post(async (req, res, next) => {
    try {
      const poem = serialize(({ title, body } = req.body));
      const results = await queries.create(req.app.get('db'), poem);
      res.status(201).json(results.rows[0]);
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
      res.status(200).json(results.rows[0]);
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
      res.status(201).json(results.rows[0]);
    } catch (err) {
      res.status(400).json(err);
    }
  })
  // DELETE A POEM
  .delete(async (req, res, next) => {
    try {
      const { id } = req.params;
      console.log(id);
      const results = queries.delete(req.app.get('db'), id);
      res.status(204).json(results);
    } catch (err) {
      res.status(400).json(err);
    }
  });

module.exports = router;