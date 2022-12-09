const express = require('express');
const cors = require('cors');
const dbConfig = require('./app/config/db.config');

const app = express();

var corsOptions = {
	origin: '*'
};

app.use(cors(corsOptions));
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
	next();
});

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require('./app/models');
const Role = db.role;

db.mongoose
	.connect(`mongodb+srv://varunsingh:test@cluster0.6zuyiir.mongodb.net/?retryWrites=true&w=majority`, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => {
		console.log('Successfully connect to MongoDB.');
		initial();
	})
	.catch((err) => {
		console.error('Connection error', err);
		process.exit();
	});

// simple route
app.get('/', (req, res) => {
	res.json({ message: 'Welcome to this application.' });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});

function initial() {
	Role.estimatedDocumentCount((err, count) => {
		if (!err && count === 0) {
			new Role({
				name: 'student',
				typeID: 3
			}).save((err) => {
				if (err) {
					console.log('error', err);
				}

				console.log("added 'student' to roles collection");
			});

			new Role({
				name: 'mentor',
				typeID: 2
			}).save((err) => {
				if (err) {
					console.log('error', err);
				}

				console.log("added 'mentor' to roles collection");
			});

			new Role({
				name: 'admin',
				typeID: 1
			}).save((err) => {
				if (err) {
					console.log('error', err);
				}

				console.log("added 'admin' to roles collection");
			});
		}
	});
}
