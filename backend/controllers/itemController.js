const Item = require("../models/Item");

// Display list of all Users json
// exports.find_match_items = async (req, res) => {
//   const query = Item.where('name', req.params.name);
//   const item = await query.find();
//   res.send(item);
// }

exports.find_match_items = async (req, res) => {
  const term = req.params.name;
  const regex = new RegExp(term, 'i'); // create case-insensitive regular expression
  const items = await Item.find({ name: regex }); // find all items that match the regular expression
  res.json(items); // return the items in JSON format
};
  
exports.find_Item =  async (req, res) => {
  const query = Item.where('id', req.params.id);
  const result = await query.findOne();
  res.send(result);
};