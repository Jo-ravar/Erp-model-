var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = 'mongodb://localhost:27017/saral';
mongoose.connect(db);

app.set('port', (process.env.PORT || 3000));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var storeRoute= require('./src/routes/Stores');
var customerRoute= require('./src/routes/Customers');
var custProRoute= require('./src/routes/CustPro');
var stProRoute= require('./src/routes/StorePro');

app.use('/store',storeRoute);
app.use('/customer',customerRoute);
app.use('/custpro',custProRoute);
app.use('/stpro',stProRoute);

app.listen(app.get('port'),function(err) {
    if(!err)
    {
        console.log("server started at port 3000");
    }
});