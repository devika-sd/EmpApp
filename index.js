var express = require('express');
var bodyParser = require('body-parser');
const fileUpload = require("express-fileupload");
var errorHandler = require('./middleware/errorHandler');
var {routing} = require('./routes/routes');
var app = express();

// app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }))

app.use(express.json());
app.use(fileUpload());
//testing ejs template
app.set('view engine','ejs');
app.use('/public', express.static('public'));

routing(app);

app.use(errorHandler);

app.listen(8080,()=>{
    console.log("server is running on port 8080");
})