import session from 'express-session';
import connectMongo from 'connect-mongo';

const options = {
    secret: 'asdasd',
    resave: false,
    saveUninitialized: false,
};

export default ({ app, mongoose }) => {
    const MongoStore = connectMongo(session);
    app.use(session({
        ...options,
        store: new MongoStore({
            mongooseConnection: mongoose.connection,
        }),
    }));
    return app;
};
