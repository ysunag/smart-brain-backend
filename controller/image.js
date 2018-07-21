const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey:'e837c85caabc48a69496a3161dd410ae'
   });

const handleApiCall = (req,res) => {
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(error => res.status(400).json('unable to work with API'));
}   

const handleImage = (db) => (req, res) => {
    const { id } = req.body;
    db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            if(entries.length) {
                res.json(entries[0]);
              } else {
                res.status(400).json('user not found')
              }
        })
        .catch(err => res.status(400).json('unable to get entries'));
}

module.exports = {
    handleImage,
    handleApiCall
}