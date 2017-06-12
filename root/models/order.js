const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const OrderSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  startpoint: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  pickupdate: {
    type: String,
    required: true
  },
  pickuptime: {
    type: String,
    required: true
  },
  recipient: {
    type: String,
    required: true
  },
  recipient_phone: {
    type: String,
    required: true
  }
});

const Order = module.exports = mongoose.model('Order', OrderSchema);

module.exports.test = function(){
  console.log("New world order!");
}

//post to users/register
module.exports.validateUsername = function(newUsername, callback){
  var query = {username: newUsername}
  User.findOne(query, callback);
}

module.exports.validateEmail = function(newEmail, callback){
  var query = {email: newEmail}
  User.findOne(query, callback);
}


//!----
module.exports.addOrder = function(newOrder, callback){
  newOrder.save(callback);
}

//post to users/authenticate
module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
}

module.exports.getOrderByUsername = function(username, callback){
  const query = {username: username}
  Order.find(query, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) console.log (err);
    callback(null, isMatch);
  });
}
