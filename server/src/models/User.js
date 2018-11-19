import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        trim: true,
        match: /\S+@\S+\.\S+/,
        required: true,
        index: true,
        unique: true,
    },
    // external IDs
    tokens: Array,
    google: {
        type: String,
        index: true,
        sparse: true,
    },
    // personal data
    profile: {
        name: {
            familyName: {
                type: String,
                trim: true,
            },
            givenName: {
                type: String,
                trim: true,
            },
        },
        photo: String,
    },
    settings: {
        darkTheme: {
            type: Boolean,
            default: false,
        },
    },
});

userSchema.methods.getJwt = function () {
    const payload = {
        profile: this.profile,
    };
    const secret = process.env.JWT_SECRET;
    const options = {
        expiresIn: '2 weeks',
        notBefore: '0s',
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
