const router = require('express').Router();

// const oauth = require('./oauth/oauth')
const users = require('./users');
const fruits = require('./fruits');

/* GET home page. */

router.use('/users', users);
router.use('/fruits', fruits);

module.exports = router;
