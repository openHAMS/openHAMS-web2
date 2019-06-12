const { ExtractJwt, Strategy } = require('passport-jwt');
const User = require('../../../models/User');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

const verify = (jwtPayload, done) => {
    return User.findById(jwtPayload.sub)
        .then(user => {
            done(null, user);
        });
};

exports.JwtStrategy = new Strategy(options, verify);
