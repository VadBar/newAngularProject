const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const keys = require('../config/key');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.jwt
};
module.exports = passport => {
    passport.use(
        new jwtStrategy(options, async (payload, done) => {
            try{
                const user = await User.findById({_id: payload._id}).select('email _id');
                if (user) {
                    done(null, user)
                } else {
                    done(null, false)
                }
            }
            catch(err) {
                console.log(err);
            }
        })
    )
};