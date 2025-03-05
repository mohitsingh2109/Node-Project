var express=require('express');

var app=express();
var router=express.Router();

router.get('/signup',function(req,res)
{
    res.sendFile(__dirname+'/signup.html');
})

router.get('/login',function(req,res)
{
    res.sendFile(__dirname+'/login.html');
})

app.use('/',router);
app.listen(4000);