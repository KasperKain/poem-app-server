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

module.exports = {
  serialize,
  queries,
};
