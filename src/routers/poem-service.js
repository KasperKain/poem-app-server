const xss = require('xss');

// SANITIZATION
const serialize = (poem) => {
  return {
    id: poem.id,
    title: xss(poem.title),
    body: xss(poem.body),
    style: poem.style,
  };
};

// SQL QUERIES
const queries = {
  create(db, poem) {
    return db.query(
      'INSERT INTO poems (title, body, style) VALUES ($1, $2, $3) returning *',
      [poem.title, poem.body, poem.style]
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

module.exports = {
  serialize,
  queries,
};
