const express = require('express');

const bodyParser = require('body-parser');

const mongoConnect = require('./util/db').mongoConnect;

const taskRoutes = require('./routes/tasksRoutes');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use('/tasks', taskRoutes);

mongoConnect();

app.listen(8000);