import { config } from "dotenv";

config();

export default {
  BucketName: process.env.BUCKET_NAME || "",
  Endpoint: process.env.ENDPOINT || "",
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://127.0.0.1/imagedb",
  aws_access_key_id: process.env.aws_access_key_id,
  aws_secret_access_key: process.env.aws_secret_access_key,
};
