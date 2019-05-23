import mongoose from 'mongoose';
import express from 'express';
import http from 'http';
import configPassport from './config/passport';

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
