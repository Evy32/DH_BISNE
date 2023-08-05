const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

const User = require('../models/User');

const controller = {
	register: (req, res) => {
        return res.render('users/register');
    },
	processRegister: (req, res) => {
		const resultValidation = validationResult(req);
		
		if (resultValidation.errors.length > 0) {
			return res.render('users/register', {
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		}

		let userInDB = User.findByField('email', req.body.email);

		if (userInDB) {
			return res.render('users/register', {
				errors: {
					email: {
						msg: 'Este email ya está registrado'
					}
				},
				oldData: req.body
			});
		}

		let userToCreate = {
			...req.body,
			password: bcryptjs.hashSync(req.body.password, 10),
			avatar: req.file.filename
		}

		let userCreated = User.create(userToCreate);
		return res.redirect('/users/login');
	},



    newProducts: (req, res) => {
		return res.render('newProducts');
	},
	processNewProducts: (req, res) => {
		const resultValidation = validationResult(req);
		
		if (resultValidation.errors.length > 0) {
			return res.render('newProducts', {
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		}
		return res.send('Ok, las validaciones se pasaron y no tienes errores');
	},

    index: (req, res) => {
        res.render('index')
    },
    signup: (req, res) => {
        res.render('users/signup')
    },
   
        
    login: (req, res) => {
      return res.render('users/login')
    }, 
    processLogin: (req,res) => {
		const resultValidation = validationResult(req);
		
		if (resultValidation.errors.length > 0) {
			return res.render('users/login', {
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		}
		return res.send('Ok, las validaciones se pasaron y no tienes errores');
	},


    productCart: (req, res) => {
        res.render('productCart')
    },
    productDetail: (req, res) => {
        res.render('productDetail')
    },
    categories: (req, res) => {
        res.render('categories')
    }
}

module.exports = controller;