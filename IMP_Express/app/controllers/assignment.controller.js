var path = require('path');
var fs = require('fs');
const formidable = require('formidable');
const db = require('../models');
const Assignment = db.assignment;
const getAssignmentDetailsOnMentorID = async (req, res) => {
	try {
		Assignment.find(
			{
				mentor_id: {
					$in: [ db.mongoose.Types.ObjectId(req.params.mentorID) ]
				}
			},
			function(err, docs) {
				res.status(200).send(docs);
				if (err) {
					res.status(500).send({ message: err });
				}
			}
		);
	} catch (error) {
		console.log(error);
	}
};
const createAssignment = async (req, res) => {
	const form = new formidable.IncomingForm();
	try {
		form.parse(req, async function(err, fields, files) {
			const assignment = new Assignment({
				name: fields.assignmentName,
				mentor_id: fields.mentor_id,
				lastDate: fields.deadline
			});
			await assignment.save((err, data) => {
				if (err) {
					res.status(500).send({ message: err });
				}
			});
			var newPath = path.join(
				process.cwd(),
				'/app/assets/' +
					fields.folderName +
					'/' +
					fields.mentor_id +
					'/' +
					assignment._id +
					'/' +
					files.file.originalFilename
			);
			var pathsToBeMade = path.join(process.cwd(), '/app/assets/' + fields.folderName + '/' + fields.mentor_id);
			if (!fs.existsSync(pathsToBeMade)) {
				fs.mkdirSync(pathsToBeMade);
			}
			pathsToBeMade = path.join(
				process.cwd(),
				'/app/assets/' + fields.folderName + '/' + fields.mentor_id + '/' + assignment._id
			);
			if (!fs.existsSync(pathsToBeMade)) {
				fs.mkdirSync(pathsToBeMade);
			}
			// if (!fs.existsSync())
			const rawData = fs.readFileSync(files.file.filepath);
			// 	fs.writeFileSync(newPath, rawData, function(err) {
			if (err) {
				console.log(err);
				res.status(500).send({
					success: false,
					error: err
				});
			}
			fs.writeFile(newPath, rawData, function(err) {
				if (err) console.log(err);
				return res.send('Successfully uploaded');
			});
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: error.message });
	}
};
const getAssignmentFile = (req, res) => {
	try {
		var newPath = path.join(
			process.cwd(),
			'/app/assets/' + 'Assignments' + '/' + req.params.mentorID + '/' + req.params.assignmentID + '/'
		);
		var allFiles = [];
		var exactFile;
		fs.readdirSync(newPath).forEach((file) => {
			allFiles.push(file);
		});

		exactFile = allFiles[0];

		const file = newPath + '/' + exactFile;

		res.download(file);
		// var readStream = fs.createReadStream(file);
		// res.writeHead(200, {
		// 	'Content-Type': 'application/pdf',
		// 	'Content-Length': stat.size
		// });
		// res.download(filePath);
		// readStream.pipe(res);
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: error.message });
	}
};
const getAssignmentDetailsOnStudentID = () => {};
module.exports = {
	createAssignment: createAssignment,
	getAssignmentFile: getAssignmentFile,
	getAssignmentDetailsOnMentorID: getAssignmentDetailsOnMentorID
};
