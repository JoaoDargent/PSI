const User = require("../models/User");
const Item = require("../models/Item");
var path = require('path');

// Display list of all Users json
exports.users_list = async (req, res) => {

  const query = User.where('id', req.params.id);
  const user = await query.findOne();
  result = []
  if (user != null){
    for (let i = 0; i < user.lists.length; i++) {
      obj ={id: user.lists[i].id, name: user.lists[i].name, values: []}
      for (let j = 0; j < user.lists[i].values.length; j++) {
        const query = Item.where('_id', user.lists[i].values[j]);
        const one = await query.findOne();
        obj.values.push(one);
      }
      result.push(obj)
    }
  }
  res.send(result);
}
  
// Display library of all Users json
exports.library_list = async (req, res) => {
  const query = User.where('id', req.params.id);
  const user = await query.findOne();
  result = []
  if (user != null){
    for (let i = 0; i < user.library.length; i++) {
      const query = Item.where('_id', user.library[i]);
      const one = await query.findOne();
      result.push(one)
    }
  }
  res.send(result);
  }

// Display followers of all Users json
exports.followers_list = async (req, res) => {
  const query = User.where('id', req.params.id);
  const user = await query.findOne();
  result = []
  if (user != null){
    for (let i = 0; i < user.followers.length; i++) {
      const query = User.where('_id', user.followers[i]);
      const one = await query.findOne();
      result.push(one)
    }
  }
  res.send(result);
  }

// Display following of all Users json
exports.following_list = async (req, res) => {
  const query = User.where('id', req.params.id);
  const user = await query.findOne();
  result = []
  if (user != null){
    for (let i = 0; i < user.following.length; i++) {
      const query = User.where('_id', user.following[i]);
      const one = await query.findOne();
      result.push(one)
    }
  }
  res.send(result);
  }

// Display one User json
exports.find_User =  async (req, res) => {
    const query = User.where('id', req.params.id);
    const result = await query.findOne();
    res.send(result);
  };

  exports.login = async (req, res, next) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username: username, password: password });
      if (user) {
        const token = jwt.sign({ userId: user._id }, "secret_key", { expiresIn: "1h" });
        res.status(200).json({
          token: token,
          userId: user._id.toString()
        });
      } else {
        res.status(401).json({
          message: "Authentication failed"
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Authentication failed"
      });
    }
  };