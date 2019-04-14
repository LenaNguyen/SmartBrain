const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '82494a1a16534019983a7a152eb80634'
  });

  const handleApiCall = (req, res) => {app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => res.send(data))
    .catch(err => res.status(400).json('image detection failed'));
  }

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entry => {
        res.json(entry);
    })
    .catch(err => res.status(400).json('unable to get entries'));
}

module.exports = {
    handleImage,
    handleApiCall
}