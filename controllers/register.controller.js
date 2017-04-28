var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('config.json');
var validation = require("validator");
var validator = require('express-validator');

var sanitizeHtml = require('sanitize-html'); 


router.get('/', function (req, res) {
    var viewData = {url:req.originalUrl ,title:'Sign Up' };
    res.render('register', viewData);
});

router.post('/', function (req, res) {
    // register using api to maintain clean separation between layers
    //https://booker.codes/input-validation-in-express-with-express-validator/
    req.checkBody("lastName", "Enter a valid email address.").isEmail();
    if(!validation.isEmail(req.body.lastName)) {
                
        console.log("Error :  ",'Email is Bad');
    }
    var errors = req.validationErrors();
    console.log("Error :  ",errors);
    console.log("sanitize html :  ",req.body);  
 
    //https://www.npmjs.com/package/sanitize-html
    var lname = sanitizeHtml(req.body.lastName);
    var fname = sanitizeHtml(req.body.firstName);
    var username = sanitizeHtml(req.body.username);
    
    console.log("config.apiUrl: ",config.apiUrl);
    request.post({
        url: config.apiUrl + '/users/register',
        form: req.body,
        json: true
    }, function (error, response, body) {
        if (error) {
            return res.render('register', { error: 'An error occurred' });
        }

        if (response.statusCode !== 200) {
            return res.render('register', {
                error: response.body,
                firstName: fname,
                lastName: lname,
                username: username
            });
        }

        // return to login page with success message
        req.session.success = 'Registration successful,Please login with your provided credencial';
        req.url = req.originalUrl;
        req.title = 'Login';
        return res.redirect('/login');
    });
});

module.exports = router;