const express = require('express');
const LoginController = require('../controllers/loginController');

const router = express.Router();

router.get('/login', LoginController.login);
router.post('/login', LoginController.auth);
router.get('/register', LoginController.register);
router.post('/register', LoginController.storeUser);
router.get('/logout', LoginController.logout);
router.get('/productos', LoginController.productos.list);


module.exports = router;