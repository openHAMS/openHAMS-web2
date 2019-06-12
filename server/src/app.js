const mongoose = require('mongoose');
const express = require('express');
const http = require('http');
const configPassport = require('./config/passport');

const mongodbUri = 'mongodb://localhost:27017/openhams';

mongoose.connect(mongodbUri, { useNewUrlParser: true })
    .catch(err => {
        console.error(err);
        throw err;
    });

const app = express();
app.set('host', '0.0.0.0');
app.set('port', 8080);

configPassport({ app });

const routes = require('./routes');
app.use('/', routes);


const server = http.createServer(app);
server.listen(app.get('port'), () => {
    console.log('listening');
});
