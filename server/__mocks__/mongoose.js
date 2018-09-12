// const mongoose = jest.genMockFromModule('mongoose'); // not working
const mongoose = {};

mongoose.connect = jest.fn();

module.exports = mongoose;
