const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
    },

    likeable: {
      type: mongoose.Schema.ObjectId,
      require: true,

      refPath: "onModel",
    },

    onModel: {
      type: String,
      require: true,

      enum: ["Post", "Comment"],
    },
  },
  {
    timestamps: true,
  }
);

//telling mongoose that it the model
const Like = mongoose.model("Like", likeSchema);
// exporting
module.exports = Like;
