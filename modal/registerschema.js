var mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const registerschema = new mongoose.Schema({
    name:
    {
        type: String,
        required: true
    },
    phone:
    {
        type: String,
        required: true
    },
    email:
    {
        type: String,
        required: true
    },
    address:
    {
        type: String,
        required: true
    },
    password:
    {
        type: String,
        required: true
    },
   
})  

registerschema.pre("save", function(next) {
    if(!this.isModified("password")) {
        return next();
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

registerschema.methods.comparePassword = function(plaintext, callback) {
    return callback(null, bcrypt.compareSync(plaintext, this.password));
};

const registerschema1 = new mongoose.model("register",registerschema);
module.exports = registerschema1;