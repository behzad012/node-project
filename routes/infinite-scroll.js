const express = require('express');
const router = express.Router();


router.use((req,res)=>{
    res.render('pages/infinite-scroll', {
        pageTitle: 'photo api'
    });
});

module.exports= router;