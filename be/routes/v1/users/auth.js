const router = require('express').Router();
const { OauthController: Auth } = require('../../../controllers/v1/user');
const { validateLogin } = require('../../../controllers/v1/user/validator');
const { AuthService: AuthMiddleware } = require('../../../middleware/auth');

router.post('/login', validateLogin, Auth.login);

// router.use(AuthMiddleware.Auth);
router.post('/logout', Auth.logout);
router.post('/refreshtoken', Auth.refreshToken);

module.exports = router;
