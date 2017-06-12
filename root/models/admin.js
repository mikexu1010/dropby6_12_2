const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const AdminSchema = mongoose.Schema({
  adminname: {
    type: String
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const Admin = module.exports = mongoose.model('Admin', AdminSchema);

//post to users/register
module.exports.validateUsername = function(newUsername, callback){
  var query = {username: newUsername}
  User.findOne(query, callback);
}

module.exports.validateEmail = function(newEmail, callback){
  var query = {email: newEmail}
  User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback){

  if(newUser.retypepwd){
    //making sure retype password is deleted
    newUser.retypepwd = null;
  }
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

//post to users/authenticate
module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
  const query = {username: username}
  User.findOne(query, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) console.log (err);
    callback(null, isMatch);
  });
}
