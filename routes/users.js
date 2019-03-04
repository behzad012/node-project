var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const mongooseUnique = require('mongoose-unique-validator');
const _ = require('lodash');

var MyUser = new mongoose.Schema({
  name:  {type:String,required:true},
  id: Number,
  body:   String,
  date: { type: Date, default: Date.now },
  age: Number,
  tags: [String],
});
// var usersCollection = mongoose.model('users',MyUser);

router.post('/', function(req, res) {
  usersCollection.findOne({'name':req.body.name},{_id:false})
  .then(data=>{
    if(data){
      res.send(_.pick(data,['name','email','password','date']));
    }else{
      res.status(400).send('not found!!')
    }
  });
  // usersCollection.update({name:'jafi'},{name:'jafii'},(err,raw)=>{
  //   console.log( 'err',err );
  //   console.log( 'raw',raw );
  // });
});



module.exports = router;
