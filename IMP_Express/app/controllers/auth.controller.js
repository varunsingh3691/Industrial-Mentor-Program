const config = require('../config/auth.config');
const db = require('../models');
const User = db.user;
const Role = db.role;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

const signup = (req, res) => {
	const user = new User({
		username: req.body.username,
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, 8)
	});

	user.save((err, user) => {
		if (err) {
			res.status(500).send({ message: err });
			return;
		}

		if (req.body.roles) {
			Role.find(
				{
					name: { $in: req.body.roles }
				},
				(err, roles) => {
					if (err) {
						res.status(500).send({ message: err });
						return;
					}

					user.roles = roles.map((role) => {
						user.typeID = req.body.typeID;
						if (role.name === 'mentor') {
							user.typeID = 2;
						} else {
							user.typeID = 1;
						}
						return role._id;
					});
					user.save((err) => {
						if (err) {
							res.status(500).send({ message: err });
							return;
						}

						res.send({ message: 'User was registered successfully!' });
					});
				}
			);
		} else {
			Role.findOne({ name: 'student' }, (err, role) => {
				if (err) {
					res.status(500).send({ message: err });
					return;
				}
				user.typeID = 3;
				user.roles = [ role._id ];
				user.save((err) => {
					if (err) {
						res.status(500).send({ message: err });
						return;
					}

					res.send({ message: 'Student was registered successfully!' });
				});
			});
		}
	});
};

const signin = (req, res) => {
	User.findOne({
		email: req.body.email
	})
		.populate('roles', '-__v')
		.exec((err, user) => {
			if (err) {
				res.status(500).send({ message: err });
				return;
			}

			if (!user) {
				return res.status(404).send({ message: 'User Not found.' });
			}

			var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

			if (!passwordIsValid) {
				return res.status(401).send({
					accessToken: null,
					message: 'Invalid Password!'
				});
			}

			var token = jwt.sign({ id: user.id }, config.secret, {
				expiresIn: 86400 // 24 hours
			});

			var authorities = [];

			for (let i = 0; i < user.roles.length; i++) {
				authorities.push('ROLE_' + user.roles[i].name.toUpperCase());
			}
			res.status(200).send({
				id: user._id,
				username: user.username,
				email: user.email,
				roles: authorities,
				accessToken: token,
				typeID: user.typeID,
				expiresIn: 86400
			});
		});
};
module.exports = {
	signup: signup,
	signin: signin
};
