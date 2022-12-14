//This file  is for: user/login, user/register, etc

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

//User model
const User = require('../models/User');

//Login Page   
router.get('/login', (req, res) => {
    res.render('login');
})

//Register Page
router.get('/register', (req, res) => {
    res.render('register');
})

//Register Handle
router.post('/register', (req, res) => {
    const {userName, email, password, confirmPassword} = req.body;
    let errors = [];

    //Check required fields
    if(!userName || !email || !password || !confirmPassword) {
        errors.push({ msg: 'Please fill in all fields' })
    }

    //Check passwords match
    if(password !== confirmPassword) {
        errors.push({ msg: 'Passwords do not match' });
    }

    //Check pass length
    if(password.length < 6) {
        errors.push({ msg: 'Passwords should be at least 6 characters' })
    }

    if(errors.length > 0 ) {
        res.render('register', {
            errors,
            userName,
            email,
            password,
            confirmPassword
        })
    }else{
        //Validation passed
        User.findOne({email: email})
        .then(user => {
            if(user) {
                //User exists
                errors.push({ msg: 'Email is already registered'});
                res.render('register', {
                    errors,
                    userName,
                    email,
                    password,
                    confirmPassword
                })
            }else {
                //If new user
                const newUser = new User({
                    userName,
                    email,
                    password
                })
                
                //encrypt password
                bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    //Set password to hash
                    newUser.password = hash;
                    //Save user
                    newUser.save()
                    .then( user => {
                        req.flash('success_msg', 'You are now registered and can log in');
                        res.redirect('/users/login');
                    })
                    .catch(err => console.log(err));
                }) )
            }
            })  

    }
});

module.exports = router;