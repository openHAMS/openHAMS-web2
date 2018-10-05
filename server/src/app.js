// import configMongoose from './config/mongoose';
import configExpress from './config/express';
import configPassport from './config/passport';
import configClientHmr from './config/client-hmr';
import http from 'http';
import mongoose from 'mongoose';


let server;
const uri = 'mongodb://localhost:27017/openhams';
const options = {
    useNewUrlParser: true,
};

mongoose.connect(uri, options)
    .catch(err => {
        console.error(err);
        throw err;
    })
    .then(mongoose => configExpress({ mongoose }))
    .then(app => {
        configPassport({ app });
        configClientHmr({ app });
        return app;
    })
    .then(app => {
        server = http.createServer(app);
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
    });
