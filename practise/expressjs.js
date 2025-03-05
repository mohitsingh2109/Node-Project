var express=require('express')
var app=express();

app.get('/',function(req,res){
    res.send("This is a index page");
})

app.get('/about',function(req,res)
{
    res.send("hello about page")
})

app.listen(4000);