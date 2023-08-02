const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "tasks",
  }
);

module.exports = mongoose.model("Product", productSchema);
