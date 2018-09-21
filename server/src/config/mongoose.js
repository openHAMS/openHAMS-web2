import mongoose from 'mongoose';

const uri = 'mongodb://localhost:27017/openhams';
const options = {
    useNewUrlParser: true,
};

export default () => {
    // TODO: handle errors
    mongoose.connect(uri, options);
    return mongoose;
};
