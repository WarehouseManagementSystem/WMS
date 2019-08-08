var express = require('express');
var http = require('http');
var path = require('path');
var history = require('connect-history-api-fallback');

var app = express();
app.set('port', 80);

app.use(history());

// express 托管静态文件 ./public 文件夹下
app.use(express.static(path.join(__dirname, 'public')));

http.createServer(app).listen(app.get('port'), function () {
    console.log('static server start on port:' + app.get('port'));
});