var mongoose = require('mongoose');
const addproductSchema = new mongoose.Schema({
    productname:
    {
        type: String,
        required: true
    },
    description:
    {
        type: String,
        required: true
    },
    price:
    {
        type: Number,
        required: true
    },
    category:
    {
        type: String,
        required: true
    },

    image:
    {
        type: String,
        required: true
    },
   
    
})
const addproductSchema1= new mongoose.model("addproduct", addproductSchema);
module.exports = addproductSchema1;