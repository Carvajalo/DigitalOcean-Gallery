import { Schema, model } from "mongoose";

const ImageSchema = new Schema(
  {
    title: {
      required: false,
      type: String,
    },
    image_url: {
      type: String,
      required: true,
    },
    key: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Image", ImageSchema);
