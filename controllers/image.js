const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: "84c69a376c334e3c96e2a19fffc9ac9c"
  });

const handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data)
        })
        .catch(err => res.status(400).json('nable to work with api'))
}

const handleImagePut = (req, res, db) => {
    const { id } = req.body;
    db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0])
        })
        .catch(err => res.status(400).json('unable to get count'))
};

module.exports = {
    handleImagePut,
    handleApiCall
}