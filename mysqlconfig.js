var mysql=require('mysql2');
var con=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'mohitsingh12',
    //database:'demo'
});

con.connect(function(error){
    if(error)throw error;
    console.log("connecected")
});
