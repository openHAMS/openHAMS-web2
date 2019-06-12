const User = require('../../../models/User');
const { get } = require('lodash');

// OAuth Strategy Overview (from https://github.com/sahat/hackathon-starter/)
//
// - User is already logged in.
//   - Check if there is an existing account with a provider id.
//     - If there is, return an error message. (Account merging not supported)
//     - Else link new OAuth account with currently logged-in user.
// - User is not logged in.
//   - Check if it's a returning user.
//     - If returning user, sign in and we are done.
//     - Else check if there is an existing account with user's email.
//       - If there is, return an error message.
//       - Else create a new account.

// adapter example
// const verifyAdapter = {
//     strategy: 'google',
//     familyName: 'name.familyName',
//     givenName: 'name.givenName',
//     photo: '_json.image.url',
// };

module.exports = (adapter) => {
    return async (req, accessToken, refreshToken, profile, done) => {
        let existingUser;
        try {
            existingUser = await User.findOne({ [adapter.strategy]: profile.id }).exec();
        } catch (err) {
            return done(err);
        }
        if (existingUser) {
            if (!req.user) {
                return done(null, existingUser);
            }
            else {
                return done(null, false, { message: 'Account merging not supported.' });
            }
        }
        let user;
        if (req.user) {
            // link
            try {
                user = await User.findById(req.user.id).exec();
            } catch (err) {
                return done(err);
            }
        }
        else {
            // restrict register to admin
            if (profile.id !== process.env.ADMIN_ID) {
                return done(null, false, { message: 'Authentication failed.' });
            }
            //
            user = new User();
            user.email = profile.emails[0].value;
        }
        user[adapter.strategy] = profile.id;
        user.tokens.push({ kind: adapter.strategy, accessToken });
        user.profile.name.familyName = user.profile.name.familyName || get(profile, adapter.familyName);
        user.profile.name.givenName = user.profile.name.givenName || get(profile, adapter.givenName);
        user.profile.photo = user.profile.photo || get(profile, adapter.photo);
        try {
            const usr = await user.save();
            return done(null, usr);
        } catch (err) {
            return done(err);
        }
    };
};
