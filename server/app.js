var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var mongoConnection = require('./modules/mongo-connection');
var decoder = require('./modules/decoder');
var musicians = require('./routes/musicians');
var privateData = require('./routes/private-data');


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/views/index.html'));
});
/** ---------- MIDDLEWARE ---------- **/
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json()); // needed for angular requests

/** ---------- EXPRESS ROUTES ---------- **/
app.use('/musicians', musicians);

app.use(decoder.token);

app.use("/privateData", privateData);

mongoConnection.connect();

/** ---------- START SERVER ---------- **/
app.set('port', process.env.PORT || 8888);

app.listen(app.get('port'), function() {
    console.log('Listening on port: ', app.get('port'));
});
