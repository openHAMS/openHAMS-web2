'use strict';

const express = require('express');

const app = express();

app.set('host', '0.0.0.0');
app.set('port', 8080);

app.listen(app.get('port'), () => {
    console.log('listening');
});
