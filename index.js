/* eslint-disable no-undef */
/*jshint esversion: 6 */ 

const express = require('express');
var app = express();
const port = process.env.PORT || 80;
const path = require('path');
const mongoose = require('mongoose');
const mock = require('./mock.json');
const mongooseUnique = require('mongoose-unique-validator');


// routes
const routerRegister = require('./routes/register');
const notFound = require('./routes/errors');
const routerGetPhotos = require('./routes/getphotos');
const routerpages = require('./routes/pages');
const routerhome = require('./routes/home');

app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'views'));

app.listen(port,()=>console.log( `server running at port ${port}` ));
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true,useCreateIndex: true})
.then(value=>console.log( 'connected to mongodb' ) )
.catch(err=>console.log( 'error',err ));


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'/public')));


app.use('/',routerhome);
app.use('/api/', routerRegister);
app.use('/api/getphotos/', routerGetPhotos);
app.use('/pages/', routerpages);



app.use('/',notFound);
