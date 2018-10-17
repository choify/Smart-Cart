var express = require('express');
var app = express();
var conn = require('./database/projectdb')
var router = require('./router/main')(app, conn);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static('public'));

var server = app.listen(3000, function () {
    console.log("Server has started on port 3000");
});
