var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('config.json');

router.get('/', function (req, res) {
    
    var viewData = {url:req.originalUrl ,title:'Welcome' , token: req.session.token};
    res.render('index', viewData);
});



module.exports = router;