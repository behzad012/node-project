const express = require('express');
const router = express.Router();
const errorsController = require('../controllers/errors');
const rootDir = require('../util/rootDir');


router.use(errorsController.notfound);

module.exports= router;