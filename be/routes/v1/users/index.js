const router = require('express').Router();
const { UserController: UC, UserValidator: UV } = require('../../../controllers/v1/user');
const { AuthService: AuthMiddleware } = require('../../../middleware/auth');
const auth = require('./auth');
const user = require('./user');
const notif = require('./notification');
const promo = require('./promo');

router.use('/auth', auth);
router.post('/register', UV.validateCreateNewUser, UC.registerNewUser);
// router.use(AuthMiddleware.Auth);
router.use('/profile', user);


module.exports = router;
