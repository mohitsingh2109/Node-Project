var express=require('express');
var app=express();
var cookieParser = require("cookie-parser");
var session = require("express-session");
const bodyParser = require('body-parser');


// router.get('/',function(req,res){
//     res.send("hello world")
// });

app.set('view engine','ejs');
app.use(express.static('views'))
app.use('/upload',express.static('upload'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var router=require('./controller/router');



app.use(cookieParser());
app.use(
    session({
        key: "user_sid",
        secret: "somerandomstuff",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 6000,
      },
      })
);



var db=require('./db.js');
const { fromString } = require('uuidv4');



app.use('/',router);
app.listen(8080)