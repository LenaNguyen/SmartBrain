const AWS = require("aws-sdk");
const fileType = require("file-type");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const uploadFile = async (userId = NULL, file) => {
  const type = await fileType.fromBuffer(file.buffer);

  const key = `${Date.now()}.${type.ext}`;
  return s3
    .upload({
      Bucket: `${process.env.S3_BUCKET}/${userId}`,
      Key: key,
      Body: file.buffer,
      ContentType: type.mime
    })
    .promise();
};

module.exports = {
  uploadFile
};
