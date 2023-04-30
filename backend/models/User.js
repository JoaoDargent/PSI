const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = require("../models/Item");

const UserSchema = new Schema({
  id: { type: String, required: true, maxLength: 100 },
  name: { type: String, required: true, maxLength: 100 },
  lists:  {type: [{name: String, values:{type: [Schema.Types.ObjectId],ref: 'Item'}}]},
  library:   {type: [Schema.Types.ObjectId],ref: 'Item'},
  followers: {type: [Schema.Types.ObjectId],ref: 'User'},
  following: {type: [Schema.Types.ObjectId],ref: 'User'},
});

module.exports = mongoose.model("User", UserSchema);