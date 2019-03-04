/*jshint esversion: 6 */ 

const express = require('express');
var app = express();
const port = process.env.PORT || 80;
const path = require('path');
const mongoose = require('mongoose');
const mock = require('./mock.json');
const mongooseUnique = require('mongoose-unique-validator');
const routerRegister = require('./routes/register.js');
const routerUsers = require('./routes/users');

app.listen(port,()=>console.log( `server running at posr ${port}` ));
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true,useCreateIndex: true})
.then(value=>console.log( 'connected to mongodb' ) )
.catch(err=>console.log( 'error',err ));

// var Users = new mongoose.model('users2');
// var user1=new usersCollection({
//     name: 'john1',
//     age: 30,
//     tags: ['javascript','mongodb','css']
// });
// user1.save().then( data=>{
//   console.log( data );
// });
// (async function myAsync() {
//   var a = await usersCollection.find();
//   console.log( a );
// }());

// usersCollection.find({name:'john2'}).then(data=>console.log( data ));


// var a = usersCollection


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'/public')));
app.use('/api/',routerRegister);
// app.use('/api/',routerUsers);

