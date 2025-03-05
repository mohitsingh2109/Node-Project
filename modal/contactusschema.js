var mongoose = require('mongoose');
const contactusschema = new mongoose.Schema({
    name:
    {
        type:String,
        required: true
    },
    email:
    {
        type:String,
        required: true
    },
    message:
    {
        type:String,
        required: true
    },
})
const contactusschema1 = new mongoose.model("contact",contactusschema);
module.exports = contactusschema1;