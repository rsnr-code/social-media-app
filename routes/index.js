//This file is for anything that is for '/' homepage 

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('welcome');
})

module.exports = router;