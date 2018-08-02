import mongoose from 'mongoose';

const uri = 'mongodb://localhost:27017/openhams';
const options = {
    useNewUrlParser: true,
};

export default () => {
    mongoose.connect(uri, options);
    return mongoose;
};
