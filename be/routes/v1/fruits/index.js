const router = require('express').Router();
const fruits = require('./fruits.js');

router.use(fruits);

module.exports = router;
