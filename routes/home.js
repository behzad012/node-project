const express = require('express');
const router = express.Router();


router.get('/',(req,res)=>{
    // res.status(404).render('404', { locals: { pageTitle: 'صفحه  پیدا نشد!', flag: true, notfound: true, styleproto: true} });
    res.render('index', {
        pageTitle: 'صفحه اصلی'
    });
});


module.exports= router;