import AWS from "aws-sdk";
import config from "../config";
import Image from "../models/image";

// Using AWS Endpoint to connect to Digital Ocean endpoint
const spacesEndpoint = new AWS.Endpoint(config.Endpoint);

// Instance of S3 Bucket (Digital Ocean space equivalent)
// Could also: ... = new AWS.S3(...params, {credentials: {accessKeyId, secretAccessKey})

const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
});

//Getting bucket space list
s3.listBuckets(function (err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.Buckets);
  }
});

export const defaultEndpoint = (req, res) => {
  res.json({
    title: {
      type: "String",
      required: true,
    },
    src: {
      type: "String path",
      required: true,
    },
    desc: {
      type: "String",
      required: false,
    },
  });
};

export const getImages = async (req, res) => {
  try {
    const images = await Image.find();
    return res.json(images);
  } catch (error) {
    res.status(500).json({
      message: error.message || `Something went wrong while creating the image`,
    });
  }
};

export const uploadImage = async (req, res) => {
  const { file } = req.files;
  try {
    const uploadedObject = await s3
      .putObject({
        ACL: "public-read-write",
        Bucket: config.BucketName,
        Key: file.name,
        Body: file.data,
      })
      .promise();
    const image_url = `https://${config.BucketName}.${config.Endpoint}/${file.name}`;
    const image = new Image({
      image_url,
      key: file.name,
      title: req.body.title,
    });
    await image.save();
    return res.json(image);
  } catch (error) {
    res.status(500).json({
      message: error.message || `Something went wrong while creating the image`,
    });
  }
};

export const getImage = async (req, res) => {
  const { id } = req.params;
  try {
    const image = await Image.findById(id);
    if (!image)
      return res
        .status(404)
        .json({ message: `Image with id ${id} doesn't exists` });
    res.json(image);
  } catch (error) {
    res.status(500).json({
      message:
        error.message ||
        `Something went wrong while retrieving the image with id ${id}`,
    });
  }
};

export const deleteImage = async (req, res) => {
  const { id } = req.params;
  const image = await Image.findById(id);
  try {
    if (!image) return res.status(202).json({ message: "image not found" });
    const deletedImage = await Image.findByIdAndDelete(id);
    await s3
      .deleteObject({
        Bucket: config.BucketName,
        Key: image.key,
      })
      .promise();
    return res.status(202).json(deletedImage);
  } catch (error) {
    res.status(500).json({
      message:
        error.message ||
        `Somethnig goes wrong while deleting the Image with id: ${image.key}`,
    });
  }
};

export const modifyImage = async (req, res) => {
  const { id } = req.params;
  const { file } = req.files;
  try {
    const image = await Image.findById(id);
    if (!image)
      return res
        .status(202)
        .json({ message: `Couldn't find a image with id: ${id}` });

    await s3
      .deleteObject({
        Bucket: config.BucketName,
        Key: image.key,
      })
      .promise();

    const uploadedObject = await s3
      .putObject({
        ACL: "public-read-write",
        Bucket: config.BucketName,
        Key: file.name,
        Body: file.data,
      })
      .promise();

    const image_url = `https://${config.BucketName}.${config.Endpoint}/${file.name}`;
    const updatedImage = await Image.findByIdAndUpdate(id, { image_url, ...req.body }, {
      useFindAndModify: false,
    });

    return res.json({ message: `Image with id: ${id} was updated` });
  } catch (error) {
    res.status(500).json({
      message: error.message || `Something went wrong while creating the image`,
    });
  }
};
