const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const Order = require('../models/order');

// Register
router.post('/register', (req, res, next) => {
  var retypepwd = req.body.retypepwd;

  let newUser = new User({
    name: req.body.name.toLowerCase(),
    email: req.body.email.toLowerCase(),
    username: req.body.username.toLowerCase(),
    password: req.body.password,
  });

  if(newUser.password.length <= 5){
    return res.json({success:false, msg: 'Password is too short'});
  }


  if(newUser.password !== retypepwd){
    //front end already ensures passwords are the same
    return res.json({success:false, msg: 'password needs to be the same(deprecated)'});

  }else{
    //-------retype password is no longer needed-------
    retypepwd = null;
  }

  //Validate User
  User.validateUsername(newUser.username, (err, user) => {
    if(err) throw err;
    if(user){
      return res.json({success:false, msg: 'User already existed'});
    }

    User.validateEmail(newUser.email, (err, email) => {
      if(err) throw err;
      if(email){
        return res.json({success:false, msg: 'Email already existed'});
      }

      User.addUser(newUser, (err, user) => {
        if(err){
          res.json({success: false, msg:'Failed to register user'});
        } else {
          res.json({success: true, msg:'User registered'});
        }
      });
    });
  });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User not found'});
    }

    if(!password){
      return res.json({success: false, msg: 'Please enter password'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign(user, config.secret, {
          expiresIn: 604800 // 1 week
        });

        res.json({
          success: true,
          token: 'JWT ' + token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        });
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  //Order
  console.log("I am here");

  /*
  Order.find({})
    .exec(function(err, orders){
      if(err) {
        console.log(err);
        throw err
      }
      else{
        console.log(orders);
        console.log("length: " + orders.length);
        console.log("--------------------------------------------");
        console.log(typeof orders);
        var ordersarray = JSON.parse(JSON.stringify(orders));

        console.log(ordersarray);
        console.log(typeof ordersarray);
        for(var i=0; i<orders.length; i++){
          console.log("i: " + i);
          console.log(ordersarray[i]);
        }
      }
    })
    */

  res.json({user: req.user});
});

router.post('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  let newOrder = new Order({
    username: req.body.username,
    password: req.body.password,
    username: req.body.username,
    startpoint: req.body.startpoint,
    destination: req.body.destination,
    pickupdate: req.body.pickupdate,
    pickuptime: req.body.pickuptime,
    recipient: req.body.recipient,
    recipient_phone: req.body.recipient_phone
  });
  console.log("-------- New Order coming in...  --------")
  console.log(newOrder);
  Order.addOrder(newOrder, (err, user) => {
    if(err){
      res.json({success: false, msg:'Failed to create order'});
    } else {
      res.json({success: true, msg:'Order created'});
    }
  });
});


router.post('/package', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  console.log("f the w");
  Order.getOrderByUsername(req.body.username, (err, order) => {
   //console.log(order);
   console.log(typeof order);

   for(i=0; i < order.length; i++){
     console.log(i);
     console.log(order[i]);

   }


   res.json(order);
 });

});

//test to
router.get('/submitorder', (req, res, next) => {

  res.json({success: true, msg:'Order created'});
});

module.exports = router;
