var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const mongooseUnique = require('mongoose-unique-validator');
const _ = require('lodash');


var userRegisterSchema = new mongoose.Schema({
  name:  {
    type:String,
    required:true,
    index: true,
    required: true
  },
  password:  {
    type:String,
    required: true
  },
  created_at: {
    type: Date, 
    default: Date.now
  },
  updated_at: {
    type: Date, 
    default: Date.now
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    index: true,
    required: true
  },
  tags: [String]
}); 


userRegisterSchema.plugin(mongooseUnique);
var usersCollection = mongoose.model('users',userRegisterSchema);

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
  var newUser=new usersCollection(_.pick(req.body,['name','password','email']));
  newUser.save().then(data=>{
      res.send(_.pick(data,['name','password','email','date','created_at','updated_at']));
  }).catch(err=>{
    res.status(400).send(err);
  });
  
});



router.get('/register/',(req,res)=>{
  usersCollection.findOne({'email':req.query.email},{_id:false})
  .then(data=>{
    if(data){
      var items= _.pick(data,['name','password','email']);
      res.send( Object.values(items) );
    }else{
      res.status(400).send('not found!!')
    }
  });
});

router.put('/register/', function(req, res) {
  usersCollection.updateOne({email:req.body.email},{
    name:req.body.name,
    password: req.body.password,
    $currentDate: {
      updated_at: true
    }
  }).then(data=>{
    usersCollection.findOne({'email':req.body.email},{_id:false})
    .then(data=>{
      res.send(_.pick(data,['name','password','email','created_at','updated_at']));
    });
  }).catch(err=>{
    res.status(400).send(err);
  });
});



router.delete('/register/',(req,res)=>{
  usersCollection.deleteOne({email:req.body.email})
  .then(data=>{
    if(data.n){
      res.send('ok');
    }else{
      res.status(400).send(err);
    }
  }).catch(err=>{
    res.status(400).send(err);
  })
});


router.post('/search/',(req,res)=>{
  usersCollection.findOne({'email':req.body.email},{_id:false})
  .then(data=>{
    if(data){
      res.send(data);
    }else{
      res.status(400).send('not found!!')
    }
  });
});



module.exports = router;


