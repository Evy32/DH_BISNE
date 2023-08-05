const express = require('express');
const router = express.Router();


//Controller
const mainController = require('../controllers/mainController');

//Middlewares
const uploadFile = require('../middlewares/multerMiddleware');
const validations = require('../middlewares/validateRegisterMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

//Formulario de Registro
router.get('/users/register', mainController.register);

// Procesa Formulario Register
router.post('/users/register', uploadFile.single('avatar'), validations, mainController.processRegister);

//Formulario de NewProducts
router.get('/newProducts', mainController.newProducts);

// Procesar Formulario New Products 
router.post('/newProducts', uploadFile.single('avatar'), validations, mainController.processNewProducts);

//Otros Get

router.get('/', mainController.index);
router.get('/index', mainController.index);
router.get('/login', mainController.login);
router.get('/signup', mainController.signup);
router.get('/productCart', mainController.productCart);
router.get('/productDetail', mainController.productDetail);
router.get('/categories', mainController.categories);



// Procesar Formulario Login
router.post('/login', validations, mainController.processLogin);

module.exports = router;