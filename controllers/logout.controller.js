var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('config.json');

router.get('/', function (req, res,next) {
    
    delete req.session.token;
    var viewData = { success: req.session.success };
    delete req.session.success;
    //res.render('login', viewData);
    console.log("check: ",req.session.success = 'You have successfully logout!!!');
    return res.redirect('/login');
    next();
});

module.exports = router;