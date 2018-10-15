import mongoose from 'mongoose';
import express from 'express';
import http from 'http';
import configExpressSession from './config/express-session';
import configPassport from './config/passport';
import configClientHmr from './config/client-hmr';

const mongodbUri = 'mongodb://localhost:27017/openhams';

mongoose.connect(mongodbUri, { useNewUrlParser: true })
    .catch(err => {
        console.error(err);
        throw err;
    });

const app = express();
app.set('host', '0.0.0.0');
app.set('port', 8080);
configExpressSession({ app, mongoose });
configPassport({ app });
if (process.env.NODE_ENV === 'development') {
    configClientHmr({ app });
}

import routes from './routes';
app.use('/', routes);


const server = http.createServer(app);
server.listen(app.get('port'), () => {
    console.log('listening');
});

if (process.env.NODE_ENV === 'development') {
    // BUG: client "cannot get /" after server hmr
    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => {
            server.close();
        });
        // module.hot.accept('./config/express', () => {
        //     server.removeListener('request', currentApp);
        //     server.on('request', app);
        //     currentApp = app;
        // });
    }
}
