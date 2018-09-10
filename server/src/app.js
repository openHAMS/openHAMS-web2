import configMongoose from './config/mongoose';
const mongoose = configMongoose();

import configExpress from './config/express';
const app = configExpress({ mongoose });

import configPassport from './config/passport';
configPassport({ app });

import configClientHmr from './config/client-hmr';
configClientHmr({ app });


import http from 'http';
const server = http.createServer(app);
server.listen(app.get('port'), () => {
    console.log('listening');
});

let currentApp = app;
if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => {
        server.close();
    });
    module.hot.accept('./config/express', () => {
        server.removeListener('request', currentApp);
        server.on('request', app);
        currentApp = app;
    });
}
