const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  id: { type: String, required: true, maxLength: 100 },
  name: { type: String, required: true, maxLength: 100 },
  description: { type: String, maxLength: 300 },
});

module.exports = mongoose.model("Item", ItemSchema);