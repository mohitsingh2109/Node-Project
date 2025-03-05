var nodeMailer=require('nodemailer');
var transport=nodeMailer.createTransport({
    host:'smtp.gmail.com',//Simple Mail Transfer Protocol(SMTP)? SMTP i used to send and receive email
    post:587,
    secure:false,
    requireTLS:true,//TLS is a way to provide secure connection between a client and a server
    auth:
    {
        user:'mohitrana1577@gmail.com',
        pass:'hdez avca sllo ymsl'
    }
});

var mailOptions={
    from:'mohitrana1577@gmail.com',
    to:'mohitrana1577@gmail.com',
    subject:'node mail',
    text:"Hello node"

}

transport.sendMail(mailOptions,function(error,info)
{
    if(error)
    {
        console.log(error);
    }
    else{
        console.log('email has been send',info.response);
    }

})