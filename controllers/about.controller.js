var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('config.json');

router.get('/', function (req, res) {
    var viewData = { title:'About',url:req.originalUrl ,token: req.session.token};
    res.render('about', viewData);
});



module.exports = router;