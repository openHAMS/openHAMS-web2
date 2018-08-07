import mongoose from 'mongoose';

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

export default mongoose.model('User', userSchema);
