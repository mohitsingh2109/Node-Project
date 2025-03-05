const mongoose = require('mongoose');

var conn=mongoose.connect("mongodb+srv://mohitrana1577:mohitsingh12@cluster0.f3qn9.mongodb.net/user?retryWrites=true&w=majority&appName=Cluster0",

    
{
 useNewUrlParser: true,
 useUnifiedTopology: true
})
.then(()=> console.log("connection successfully.."))
.catch((err) => console.log(err));



module.exports=conn;