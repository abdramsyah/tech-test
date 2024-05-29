const router = require('express').Router();
const { FruitController: Fruits } = require('../../../controllers/v1/fruits');
const { AuthService: AuthMiddleware } = require('../../../middleware/auth');

// router.use(AuthMiddleware.Auth);
router.post('/', Fruits.createFruit);
router.get('/', Fruits.getListFruits);
router.get('/:id', Fruits.getFruitById);
router.put('/edit/:id', Fruits.updateFruit);
router.delete('/delete/:id', Fruits.deleteFruit);

module.exports = router;
