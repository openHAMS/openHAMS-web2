import { ExtractJwt, Strategy } from 'passport-jwt';
import User from 'Models/User';

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

const verify = (jwtPayload, done) => {
    console.log(jwtPayload);
    return User.findById(jwtPayload.sub)
        .then(user => {
            console.log(user);
            done(null, user);
        });
};

export const JwtStrategy = new Strategy(options, verify);
