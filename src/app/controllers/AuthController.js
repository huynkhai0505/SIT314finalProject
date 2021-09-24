const User = require('../models/User');
const {multipleMongooseToObject, mongooseToObject} = require('../../util/mongoose');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

class AuthController {
    async register (req, res, next) {
        try {
            const {email, password, passwordVerify} = req.body;
    
            // Validation
    
            if(!email || !password || !passwordVerify)
                return res
                    .status(400)
                    .json({
                        errorrMessage: "Please enter all required fields"});
    
            if(password.length < 6)
                return res
                    .status(400)
                    .json({
                        errorMessage: "Please enter a password at least 6 characters"});
    
            if(password !== passwordVerify)
                return res
                    .status(400)
                    .json({
                        errorMessage: "Password doesn't match"});
    
            const existingUser = await User.findOne({email})
    
            if(existingUser)
                return res
                        .status(400)
                        .json({
                            errorMessage: "The user has already been existed"})
    
            //Hash password
            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(password, salt);
    
            const newUser = new User({
                email,
                passwordHash
            })
            const savedUser = await newUser.save();

            // Sign a token
            const token = jwt.sign({
                user: savedUser.email,
            }, 'secret');
    
            res.cookie("token", token, {
                httpOnly:true,
            }).send(200)
    
        } catch (error) {
            console.log(error);
            res.status(500).send
        }
    }

    login(req, res, next) {
        res.render('auth/login');
    }

    async logout(req, res, next) {
        res.cookie("token", "", {
            httpOnly:true,
            expires: new Date(0)
        })
        .render('auth/login', {token: " "})
    }

    async checkLogin(req, res, next) {
        try {
            const {email, password} = req.body;
    
            // Validate
            if(!email || !password){
                return res
                    .status(400)
                    .json({errorMessage: "Please enter all the required fields"})
            }
    
            const existingUser = await User.findOne({email});
    
            console.log(existingUser);
            if(!existingUser)
                return res
                        .render('auth/login', {message: 'Wrong username or password, please try again'})
                        .redirect('/auth/login')
    
            const passwordCorrect = await bcrypt.compare(password, existingUser.passwordHash);
            if(!passwordCorrect)
                return res
                        .status(401)
                        .json({errorMessage: "Password is invalid"})

            const tokenUser = {user:  existingUser.email}
            
            const token = jwt.sign(tokenUser, 'gmndshhrjvjhsw4bnds221a');
    
            res.cookie('token', token, {
                httpOnly: true,
            });
            res.render('home1', {token: token})
            res.redirect('/')

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new AuthController;