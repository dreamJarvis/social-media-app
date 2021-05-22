const { SECRET_KEY } = require('../../config');
const User = require('../../models/User');

// lib's for hashing & crypting passwords
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    Mutation: {
        async register(
            _, 
            {   
                registerInput: { username, email, password, confirmPassword}
            }, 
            context, 
            info
        ){
            // TODO: Vaidate user data
            
            // TODO: Make sure user doesn't already exists

            // TODO: hash password and create auth token 
            password = await bcrypt.hash(password, 12);

            const newUser = new User({
                username,
                password,
                email, 
                createdAt: new Date().toISOString()
            });

            const res = await newUser.save();   // saving the new data to the db

            const token = jwt.sign({
                id: res.id, 
                email: res.email, 
                username: res.username
            }, SECRET_KEY, { expiresIn: '1h'}  );
            
            return {
                ...res._doc,
                id: res._id,
                token
            };
        }
    }
}