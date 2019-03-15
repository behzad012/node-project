/*jshint esversion: 6 */ 

const express = require('express');
var app = express();
const port = process.env.PORT || 80;
const path = require('path');
const mongoose = require('mongoose');
const mock = require('./mock.json');
const mongooseUnique = require('mongoose-unique-validator');


// routes
const routerRegister = require('./routes/register.js');
const routerUsers = require('./routes/users.js');
const notFound = require('./routes/notFound.js');
const routerGetPhotos = require('./routes/getphotos.js');

app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'views'));

app.listen(port,()=>console.log( `server running at port ${port}` ));
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true,useCreateIndex: true})
.then(value=>console.log( 'connected to mongodb' ) )
.catch(err=>console.log( 'error',err ));


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'/public')));



app.use('/api/', routerRegister);
app.use('/api/getphotos', routerGetPhotos);


app.use('/',notFound);
