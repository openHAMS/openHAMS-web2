import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
    },
    // external IDs
    tokens: Array,
    google: {
        type: String,
        sparse: true,
    },
    // personal data
    profile: {
        name: {
            familyName: String,
            givenName: String,
        },
        photo: String,
    },
    settings: {
        darkMode: Boolean,
    },
});

userSchema.methods.getJwt = function () {
    const payload = {};
    const secret = process.env.JWT_SECRET;
    const options = {
        expiresIn: '2 weeks',
        notBefore: Date.now(),
        subject: this._id.toString(),
    };
    return jwt.sign(payload, secret, options);
};

userSchema.methods.toApiObject = function () {
    return {
        profile: this.profile,
        settings: this.settings,
    };
};

export default mongoose.model('User', userSchema);
