import configMongoose from './config/mongoose';
const mongoose = configMongoose();

import configExpress from './config/express';
const app = configExpress({ mongoose });

import configPassport from './config/passport';
configPassport({ app });


import http from 'http';
const server = http.createServer(app);
server.listen(app.get('port'), () => {
    console.log('listening');
});
