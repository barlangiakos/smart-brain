const Clarifai = require('clarifai');
const app = new Clarifai.App({apiKey: '75eb22355aab4b529836c49995bca682'});

const handleApiCall = (req, res) => {
	app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => {res.json(data)})
	.catch(error => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
	const {id} = req.body;
	db('users').where('id', '=', id)
	  .increment('entries', 1)
	  .returning()
	  .then(entries => {
	  	res.json(entries);
	  })
	  .catch(error => res.status(400).json('unable to get entries'))
} 

module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall
}