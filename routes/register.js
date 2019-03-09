var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const mongooseUnique = require('mongoose-unique-validator');
const _ = require('lodash');


var userRegisterSchema = new mongoose.Schema({
  name:  {
    type:String,
    required:true,
    index: true
  },
  id: Number,
  password:   String,
  date: { type: Date, default: Date.now },
  age: Number,
  email: {
    type: String,
    lowercase: true,
    unique: true,
    index: true,
    required: true
  }
}); 

var MyUser = new mongoose.Schema({
  name:  {type:String,required:true},
  id: Number,
  body:   String,
  date: { type: Date, default: Date.now },
  age: Number,
  tags: [String],
});

userRegisterSchema.plugin(mongooseUnique);
var userRegisterCollection = mongoose.model('registers',userRegisterSchema);
var usersCollection = mongoose.model('users',MyUser);

// userRegisterCollection.find({'name':'jafi'}).then(data=>{
//   console.log( data );
//   res.send(data);
// });

// router.route('/')
// .post((req,res)=>{
//   // var newUser=new userRegisterCollection({
//   //   name: req.body.name,
//   //   password: req.body.password,
//   //   email: req.body.email
//   // });
//   var newUser=new userRegisterCollection(_.pick(req.body,['name','password','email']));
//   newUser.save().then(data=>{
//       res.send(_.pick(data,['name','email','password','date']));
//   }).catch(err=>{
//     res.send(err);
//   });
  
// })
// .get((req,res)=>{
//   console.log( req.query.name );
//   userRegisterCollection.find({'name':req.query.name})
//   .then(data=>{
//     if(data.length>0){
//       var newarr =[];
//       data.forEach((value,i)=>{
//         newarr.push( _.pick(value,['name','email','password','date']) );
//       });
//       console.log( 'newarr',newarr );
//       res.send(newarr);
//     }else{
//       res.status(400).send('not found!!')
//     }
//   });
// });

router.post('/register/',(req,res)=>{
  // var newUser=new userRegisterCollection({
  //   name: req.body.name,
  //   password: req.body.password,
  //   email: req.body.email
  // });
  var newUser=new userRegisterCollection(_.pick(req.body,['name','password','email']));
  newUser.save().then(data=>{
      res.send(_.pick(data,['name','email','password','date']));
  }).catch(err=>{
    res.status(400).send(err);
  });
  
});



router.get('/register/',(req,res)=>{
  // var newUser=new userRegisterCollection({
  //   name: req.body.name,
  //   password: req.body.password,
  //   email: req.body.email
  // });
  var newUser=new userRegisterCollection(_.pick(req.body,['name','password','email']));
  newUser.save().then(data=>{
      res.send(_.pick(data,['name','email','password','date']));
  }).catch(err=>{
    res.status(400).send(err);
  });
  
});

router.put('/register/', function(req, res) {
  usersCollection.findOne({'name':req.body.name},{_id:false})
  .then(data=>{
    console.log( typeof(data) );
    if(data){
      console.log( _.pick(data,['name','email','password']) );
      res.send(data);
    }else{
      res.status(400).send('not found!!')
    }
  });
  // usersCollection.update({name:'jafi'},{name:'jafii'},(err,raw)=>{
  //   console.log( 'err',err );
  //   console.log( 'raw',raw );
  // });
});

router.delete('/register/',(req,res)=>{
  // var newUser=new userRegisterCollection({
  //   name: req.body.name,
  //   password: req.body.password,
  //   email: req.body.email
  // });
  var newUser=new userRegisterCollection(_.pick(req.body,['name','password','email']));
  newUser.save().then(data=>{
      res.send(_.pick(data,['name','email','password','date']));
  }).catch(err=>{
    res.status(400).send(err);
  });
  
});


router.post('/search/',(req,res)=>{
  userRegisterCollection.find({'name':req.query.name})
  .then(data=>{
    if(data.length>0){
      var newArray =[];
      data.forEach((value,i)=>{
        newArray.push( _.pick(value,['name','email','password','date']) );
      });
      res.send(newArray);
      console.log( newArray );
    }else{
      res.status(400).send('not found!!')
    }
  });
});



module.exports = router;
