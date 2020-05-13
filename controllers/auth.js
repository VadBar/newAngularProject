const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/key');
const errorHandler = require('../utils/errorHandler');
module.exports.login = async (req, res) => {
    const similerUser = await User.findOne({email: req.body.email});
    if(similerUser) {
        const resultPassword = bcrypt.compareSync(req.body.password, similerUser.password);
        if(resultPassword) {
            const token = jwt.sign({
                email: similerUser.email,
                _id: similerUser._id
            }, keys.jwt, {expiresIn: '24h'});
            res.status(200).json({
                token: `Bearer ${token}`
            });
        } else {
            res.status(401).json({
                message: 'Неправельный пароль!'
            });
        }
    } else {
        res.status(404).json({
            message: 'Такого емайла не существует!'
        });
    }
};
module.exports.registration = async(req, res) => {
    const similerEmail = await User.findOne({email: req.body.email});
    if(similerEmail) {
         res.status(409).json({
             message: 'Такой емеил уже используеться!'
         });
    } else {
         const salt = bcrypt.genSaltSync(10);
         const readyPassword = bcrypt.hashSync(req.body.password, salt);
         const user = new User({
             email: req.body.email,
             password: readyPassword
         });
         try{
             await user.save();
             res.status(201).json(user);
         }
         catch(e) {
             errorHandler(res, err);
         }
    }
};