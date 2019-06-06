const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.users = (req, res, next) => {

    User.findOne({ where: {email: req.email} })
    .then((data) => {
        res.status(200).json(data);
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });    
};

exports.createUser = (req, res, next) => {
    User.create(req.body)
    .then(result => {
        res.status(201).json({
            data: result.dataValues
        });
    })
    .catch(err => {
        console.log(err);
        res.status(400).json({
            error: err.errors
        });
    });
};

exports.updateUser = (req, res, next) => {
    User.findOne({
        attributes: [
            'id','first_name', 'last_name', 'email'
        ],
        where: {email: req.email}        
    })
    .then(user => {
        Object.assign(user, req.body);
        user.save().then(result => {
            res.status(200).json(result);
        }).catch(err=>{
            res.status(400).json({
                error: err.errors
            });
        });
    })
    .catch(err=>res.json(err));
};

exports.login = (req, res, next) => {
    const { email, password } = req.body;

    User.findOne({ where: { email }})
    .then(user => {
        if(user) {
            if(bcrypt.compareSync(password, user.password)) {
                const payload = { email };
                const token = jwt.sign(payload, process.env.SECRET, {
                  expiresIn: '1h'
                });
                res.cookie('token', token, { httpOnly: true })
                  .sendStatus(200);
            } else {
                res.status(401)
                .json({
                    error: {message: 'Incorrect email or password'}
                });
            }            
        } else {
            res.status(401)
            .json({
                error: {message: 'Incorrect email or password'}
            });             
        }
    })
    .catch(err => {
        console.log('error', err);
        res.status(500).json({error: err.errors});
    });
}

exports.logout = (req, res, next) => {
    res.cookie('token', 'deleted', { httpOnly: true })
    .sendStatus(200);
}