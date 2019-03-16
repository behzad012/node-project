const express = require('express');
const router = express.Router();
const pagesController = require('../controllers/pages');

// router.get('/register/',(req,res)=>{
//     // res.status(404).render('404', { locals: { pageTitle: 'صفحه  پیدا نشد!', flag: true, notfound: true, styleproto: true} });
//     res.render('pages/register', {
//         pageTitle: 'ثبت نام'
//     });
// });

router.get('/register/', pagesController.register);
router.get('/infinite-scroll/', pagesController.infinite_scroll);



module.exports= router;