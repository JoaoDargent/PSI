const User = require("../models/User");
const Item = require("../models/Item");
const UserController = require("../controllers/userController");

exports.init = (req, res) => {
    createItems();
    createUsers();
    res.send();
};
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const mongoDB = "mongodb+srv://tiagomg7fernandes:mBTQcpcGgtJeLuDj@locallibrary.kxp3fjt.mongodb.net/my_database?retryWrites=true&w=majority";

users = []
items = []

async function userCreate(id, name, lists, library, followers, following) {
    userdetail = { id: id, name:name, lists:lists, library:library, followers:followers, following:following};
    const user = new User(userdetail);
    users.push(user);
    await user.save();
    console.log(`Added user: ${name}`);
}

async function createUsers() {
    await Promise.all([
        //userCreate(1,"Becky"),
        //userCreate(2,"Tom"),
        //userCreate(3,"Huckleberry"),
        userCreate(1,
            "Becky",
            "12345",
            [{name : "lista1", values: [await Item.where('id', 1).findOne(), await Item.where('id', 2).findOne()]},
                      {name:"lista2", values: [await Item.where('id', 3).findOne(), await Item.where('id', 2).findOne()]}],
            [await Item.where('id', 1).findOne(), await Item.where('id', 2).findOne()],
            [],
            []
            ),
        userCreate(2,
            "Tom",
            "tom", 
            [{name : "lista1", values: [await Item.where('id', 1).findOne(), await Item.where('id', 2).findOne()]},
                      {name:"lista2", values: [await Item.where('id', 3).findOne(), await Item.where('id', 2).findOne()]}],
            [await Item.where('id', 1).findOne(), await Item.where('id', 2).findOne()],
            [await User.where('id', 1).findOne()],
            [await User.where('id', 1).findOne()],
            ),
        userCreate(3,
            "Huckleberry", 
            [{name : "lista1", values: [await Item.where('id', 1).findOne(), await Item.where('id', 2).findOne()]},
                      {name:"lista2", values: [await Item.where('id', 3).findOne(), await Item.where('id', 2).findOne()]}],
            [await Item.where('id', 1).findOne(), await Item.where('id', 2).findOne()],
            [await User.where('id', 1).findOne(), await User.where('id', 2).findOne()],
            [await User.where('id', 1).findOne(), await User.where('id', 2).findOne()],
            ),
        userCreate(4,
            "Amy", 
             [{name : "lista1", values: [await Item.where('id', 1).findOne(), await Item.where('id', 2).findOne()]},
                      {name:"lista3", values: [await Item.where('id', 3).findOne(), await Item.where('id', 2).findOne()]}],
            [await Item.where('id', 1).findOne(), await Item.where('id', 2).findOne()],
            [await User.where('id', 3).findOne(), await User.where('id', 2).findOne()],
            [await User.where('id', 3).findOne(), await User.where('id', 2).findOne()],
            ),
    ]);
}

async function itemCreate(id, name, description) {
    itemdetail = { id: id, name:name};
    const item = new Item(itemdetail);
    items.push(item);
    await item.save();
    console.log(`Added item: ${name}`);
}

async function createItems() {
    await Promise.all([
        itemCreate(1,"Car"),
        itemCreate(2,"Phone"),
        itemCreate(3,"Ball"),
        itemCreate(4,"Dice"),
    ]);
}

async function getItemId(id) {
    const query = Item.where('id', id);
    const result = await query.findOne();
    return result;
    }
async  function getUserId(id) {
    const query = User.where('id', id);
    const result = await query.findOne();
    return result;
}

async function getItems() {
    const items= await Item.find()
    return items;
}







