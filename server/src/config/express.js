import express from 'express';
import session from 'express-session';
import connectMongo from 'connect-mongo';

function setupSession(app, mongoose) {
    const MongoStore = connectMongo(session);
    app.use(session({
        secret: 'asdasd',
        store: new MongoStore({
            mongooseConnection: mongoose.connection,
        }),
        resave: false,
        saveUninitialized: false,
    }));
}

export default ({ mongoose }) => {
    const app = express();
    app.set('host', '0.0.0.0');
    app.set('port', 8080);
    setupSession(app, mongoose);
    return app;
};
