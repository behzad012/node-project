var express = require('express');
var router = express.Router();
const _ = require('lodash');
const Unsplash  = require('unsplash-js').default;
require('es6-promise').polyfill();
require('isomorphic-fetch');


const unsplash = new Unsplash({
    applicationId: "943fee9de0736ad9f96d496d8f228b25a8ca71142d2afbf5c463ac9e1fcdac11",
    secret: "9a03c6f384c11be61a2e44c1aac04a5a50b4c3f3ccaaa082ea7deb38c8dae536"
});



router.get('/',(req,res)=>{
    var photos=[];
    unsplash.search.photos(req.query.query, req.query.page, req.query.per_page)
    .then(data=>{
        return data.json()
    })
    .then(json => {
        // console.log( json.results );
        json.results.forEach(element => {
            photos.push(element.urls.regular) ;
        });
        res.send(photos);
    })
});


module.exports = router;

