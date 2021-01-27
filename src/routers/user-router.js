const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtGenerator = require('../jwtGenerator');
const { queries, serialize } = require('./user-service');

router.route('/signup').post((req, res, next) => {
  try {
    bcrypt.hash(req.body.password, 10, async (err, hash) => {
      if (err) {
        res.status(500).json({
          error: err,
        });
      } else {
        const { email } = req.body;
        const user = await queries.get(req.app.get('db'), email);

        if (user.rows.length >= 1) {
          res.status(500).json({
            message: 'Email exists',
          });
        } else {
          const results = await queries.create(req.app.get('db'), {
            email,
            password: hash,
          });

          res.status(201).json(results.rows[0]);
        }
      }
    });
  } catch (err) {
    console.error(err);
  }
});

router.route('/login').post(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await queries.get(req.app.get('db'), email);

    if (user.rows.length < 1) {
      res.status(401).json({
        message: 'Auth failed',
      });
    } else {
      bcrypt.compare(password, user.rows[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            messge: 'Auth failed',
          });
        }

        if (result) {
          const jwtToken = jwtGenerator(user.rows[0].id);
          return res.status(200).json({
            message: 'Auth successful',
            token: jwtToken,
          });
        }

        res.status(401).json({
          message: 'Auth failed',
        });
      });
    }
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
