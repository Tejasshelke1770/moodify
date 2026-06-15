import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  url: {
    type: String,
    required: [true, "song url is required"],
  },
  posterUrl: {
    type: String,
    required: [true, "poster url is required"],
  },
  title: {
    type: String,
    required: [true, "title is required"],
  },
  mood: {
    type: String,
    enum: {
      values: ["sad", "happy", "surprise"],
      message: "mood can be sad, happy or surprise only!",
    },
  },
});

const songModel = mongoose.model("songs", songSchema);
export default songModel;
