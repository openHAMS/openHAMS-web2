import mongoose from 'mongoose';

const uri = 'mongodb://localhost:27017/openhams';
const options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
};

export default async () => {
    // TODO: handle errors
    return mongoose.connect(uri, options);
};
