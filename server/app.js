var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var mongoConnection = require('./modules/mongo-connection');
var decoder = require('./modules/decoder');
var musicians = require('./routes/musicians');
var privateData = require('./routes/private-data');
var portDecision = process.env.PORT || 3000;



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

app.listen(portDecision, function() {
    console.log('running on port', portDecision);
});
