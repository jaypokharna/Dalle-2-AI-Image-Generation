import mongoose from "mongoose";

const ImageSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  filePath: {
    type: String,
    required: true,
  },
  community: {
    type: Boolean,
    default: false,
  },
});

const Images = mongoose.model("Images", ImageSchema);
export default Images;
