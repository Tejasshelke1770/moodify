import mongoose from "mongoose";

const blackListSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: [true, "token is required to blacklist"],
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

const blackListModel = mongoose.model("blacklist", blackListSchema);

export default blackListModel;
