const express = require('express');
const router = express.Router();
const usersCollection = require('../models/usersCollection');
const _ = require('lodash');
const { check, validationResult } = require('express-validator/check');


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

router.post('/register/',[
  check('name','نام نمی تواند خالی باشد').isLength({min:3}),
  check('password','کلمه عبور  حداقل 5 کاراکتر باید باشد').isLength({ min: 5 }),
  check('email').isEmail().withMessage('آدرس ایمیل نامعتبر است').isLength({min:1}).withMessage('آدرس ایمیل  نمی تواند خالی باشد'),
  check('passwordConfirmation').custom( (value,{req})=>value==req.body.password ).withMessage('کلمه عبور مطابقت ندارد').isLength({min:5}).withMessage('تکرار کلمه عبور  حداقل 5 کاراکتر باید باشد')
],(req,res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }else{
    console.log( 'else' );    
    let newUser=new usersCollection(_.pick(req.body,['name','password','email']));
    newUser.save().then(data=>{
        res.send(_.pick(data,['name','password','email','date','created_at','updated_at']));
    }).catch(err=>{
      res.status(400).send(err);
    });
  }
});



router.get('/register/',(req,res)=>{
  usersCollection.findOne({'email':req.query.email},{_id:false})
  .then(data=>{
    if(data){
      let items= _.pick(data,['name','password','email']);
      res.send( Object.values(items) );
    }else{
      res.status(400).send('not found!!')
    }
  });
});

router.put('/register/', [
  check('name','نام نمی تواند خالی باشد').isLength({min:3}),
  check('password','پسورد حداقل 5 کاراکتر باید باشد').isLength({ min: 5 }),
  check('email','آدرس ایمیل نامعتبر است').isEmail()
],function(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }else{
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
  }
});



router.delete('/register/',(req,res)=>{
  usersCollection.deleteOne({email:req.body.email})
  .then(data=>{
    if(data.n){
      res.send('ok');
    }else{
      res.status(400).send('err');
    }
  }).catch(err=>{
    res.status(400).send(err);
  })
});


router.post('/search/',(req,res)=>{
  usersCollection.findOne({'email':req.body.email},{_id:false})
  .then(data=>{
    if(data){
      res.send(_.pick(data,['name','password','email','created_at','updated_at']));
    }else{
      res.status(400).send('not found!!')
    }
  });
});



module.exports = router;


