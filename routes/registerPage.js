const express = require('express');
const router = express.Router();


router.use((req,res)=>{
    // res.status(404).render('404', { locals: { pageTitle: 'صفحه  پیدا نشد!', flag: true, notfound: true, styleproto: true} });
    res.render('pages/register', {
        pageTitle: 'ثبت نام'
    });
});

module.exports= router;