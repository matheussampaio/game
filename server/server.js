const http = require('http');
const path = require('path');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const errorhandler = require('errorhandler');
const methodOverride = require('method-override');

const app = express();

if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
}

app.use(bodyParser.json());
app.use(express.static(path.resolve('public')));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride());
app.use(errorhandler());

app.get('/', (req, res) => {
    res.sendFile(path.resolve('public/index.html'));
});

const server = http.Server(app);
const io = require('socket.io')(server);

server.listen(process.env.PORT || 3000);

let id = 0;

io.on('connection', (socket) => {
    id += 1;

    console.log('connection', id);

    socket.emit('hello', { id });

    socket.on('start', (data) => {
        console.log('start', data)
    });

});

module.exports = server;
