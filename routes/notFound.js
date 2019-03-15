const express = require('express');
const router = express.Router();
const path = require('path');
const rootDir = require('./../util/rootDir.js');


router.use((req,res,next)=>{
    // res.status(404).render('404', { locals: { pageTitle: 'صفحه  پیدا نشد!', flag: true, notfound: true, styleproto: true} });
    res.status(404).render('404', { pageTitle: 'صفحه  پیدا نشد!', flag: true, notfound: true, styleproto: true });
});

module.exports= router;