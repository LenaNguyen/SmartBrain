const Clarifai = require("clarifai");
const awsService = require("../services/awsService");

const app = new Clarifai.App({
  apiKey: process.env.API_CLARIFAI
});

const handleApiCall = () => (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => res.send(data))
    .catch(err => res.status(400).json("image detection failed"));
};

const handleUploadAsync = db => async (req, res) => {
  const { file } = req;
  const { userId } = req.body;

  try {
    const fileData = await awsService.uploadFile(userId, file);
    await db("images").insert({
      user_id: userId,
      key: fileData.key,
      location: fileData.Location
    });
    res.status(200).json({ location: fileData.Location });
  } catch (error) {
    console.log(error);
    res.status(500).json("unable to upload file");
  }
};

module.exports = {
  handleApiCall,
  handleUpload: handleUploadAsync
};
