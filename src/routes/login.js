const express = require('express');
const LoginController = require('../controllers/loginController');

const router = express.Router();

router.get('/login', LoginController.login);  //los get hacen acciones
router.get('/loginAdmin', LoginController.loginAdmin);
router.post('/login', LoginController.auth);
router.post('/loginAdmin', LoginController.authAdmin);
router.get('/register', LoginController.register);
router.post('/register', LoginController.storeUser);
router.get('/logout', LoginController.logout);
router.get('/productos', LoginController.productos.list);
router.get('/clientes', LoginController.clientes.list);
router.get('/administradores', LoginController.administradores.list);
router.post('/add', LoginController.guardarProductos);   //los post guardan datos
router.get('/delete/:id', LoginController.productos.delete);
router.get('/edit/:id',LoginController.productos.edit);
router.post('/update/:id',LoginController.update);

module.exports = router;