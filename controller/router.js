var express=require('express');
var registerschema = require('../modal/registerschema');
const contactusschema1 = require('../modal/contactusschema');
var addproductSchema = require('../modal/addproductschema');
const Category = require('../modal/categoryschema');
var router=express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');


router.get('/addcategory',function(req,res)
{
    res.render("dashboard/addcategory");
});

router.post('/addcategory',(req,res) => {
    var regpost=
    {
        name: req.body.name,
        description: req.body.description,
    };
    var reg = new Category (regpost)
reg.save()
.then((item) =>
    res.json('added successfully'))
.catch(err => res.status(400).json('error:' + err));
});


// Route to display products by category
router.get('/menu', async (req, res) => {
    try {
        // Fetch all categories from the database
        const categories = await Category.find();

        // Fetch products for each category
        const products = {};
        for (const category of categories) {
            const categoryProducts = await addproductSchema.find({ category: category._id });
            products[category.name] = categoryProducts;
        }

        // Render the page with categories and their respective products
        res.render('menu', { categories, products });
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).send('Server error');
    }
});
router.get('/menu', async (req, res) => {
    try {
        const categories = await Category.find(); // Fetch all categories from DB
        res.render('menu', { categories }); // Pass categories to the view
    } catch (err) {
        console.error('Error fetching categories:', err);
        res.status(500).send('Server error');
    }
});

// router.get('/',function(req,res)
// {
//     res.render('index');
// })
router.get("/", async (req,res) => {
    try {
        const productdata = await addproductSchema.find({});
        res.render('index', { productdata: productdata }); // Ensure this line is present
        console.log(productdata);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server error");
    }
});




router.get('/about',function(req,res)
{
    res.render('about');
})


// router.get('/dashboard',function(req,res)
// {
//     res.render("dashboard/index");
// })

router.get('/dashboard', function(req, res){
    if(req.session.user && req.cookies.user_sid){
        res.render('dashboard/index');
    } 


else {
    res.redirect('/login');
}
})


router.get('/addproduct', async (req, res) => {
    try {
        // Query all categories from the database
        const categories = await Category.find();

        // Pass categories to the EJS template
        res.render('dashboard/addproduct', { categories });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).send('Server error');
    }
});

router.get('/addproduct/:categoryId', async (req, res) => {
    try {
        const items = await addproductSchema.find({ category: req.params.categoryId });
        res.json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching products' });
    }
});


//File upload start

// Updated Multer setup for file upload size limit
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './upload'); // Destination folder for file storage
    },

    filename: function (req, file, cb) {
        // Using original filename or creating a custom name if needed
        cb(null, file.originalname);
    }
});

// File filter for allowed file types
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type, only JPEG, JPG, PNG, and WEBP are allowed'), false);
    }
}

// Multer configuration for file size and file type
const Upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 10000 * 1024 // Set file size limit to 100KB (100 * 1024 bytes)
    }
});

// Example for handling file upload in a POST route
router.post('/addproduct', Upload.single('image'), (req, res) => {
    // Check if a file is uploaded
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const productData = {
        productname: req.body.productname,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: req.file.filename,
    };

    // Save product data to the database
    const product = new addproductSchema(productData);
    product.save()
        .then(() => res.json('Product added successfully'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Example of how to handle errors with multer file size limits
router.post('/addproduct', Upload.single('image'), (req, res) => {
    if (req.fileValidationError) {
        return res.status(400).send(req.fileValidationError);
    }

    if (!req.file) {
        return res.status(400).send('Please upload a file.');
    }

    res.send('File uploaded successfully!');
});
//Editt add product


router.post('/edit/:id', async (req, res) => {
    const itemId = req.params.id;
    const updatedData ={
        proname: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        password: req.body.password,
    }
    //Data to update with

    try {
        const updatedItem = await addproductSchema.findByIdAndUpdate(itemId,updatedData, { new: true });

        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found'});
        }
        res.redirect('../viewproduct');

        //res.json(updatedItem)
    } catch (err) {
        res.status(500).json({ message: 'Server error'});
    }
});


// router.get('/viewproduct',function(req,res)
// {
//     res.render("dashboard/viewproduct");
// })

//vieew product
router.get("/viewproduct", async (req,res) => {
    try{
        const productdata = await addproductSchema.find({});
        res.render('dashboard/viewproduct',{productdata: productdata });
        console.log(productdata);
    } catch (err) {
        console.log(err);
    }
});

//delete api
router.get("/delete2/:id", async (req, res) => {
    try{
        const productdata = await addproductSchema.findByIdAndDelete
        (req.params.id);

        //return res.redirect("your url");
        res.redirect('/viewproduct');
    }
    catch (err){
        console.log(err);
    }
})

//edit api
router.get("/edit2/:id", async (req, res) => {
    try{
        const productdata = await addproductSchema.findById
        (req.params.id);

        //return res.redirect("your url");
        res.render('dashboard/edit-product',{productdata: productdata});
    }
    catch (err){
        console.log(err);
    }
})


// update dataa

router.post('/edit2/:id', async (req, res) => {
    const itemId = req.params.id;
    const updatedData ={
        productname: req.body.productname,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: req.body.image,
    }
    //Data to update with

    try {
        const updatedItem = await addproductSchema.findByIdAndUpdate(itemId,updatedData, { new: true });

        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found'});
        }
        res.redirect('../viewproduct');

        //res.json(updatedItem)
    } catch (err) {
        res.status(500).json({ message: 'Server error'});
    }
});





// View register
router.get("/viewregister", async (req,res) => {
    try{
        const registerdata = await registerschema.find({});
        res.render('dashboard/viewregister',{registerdata: registerdata });
        console.log(registerdata);
    } catch (err) {
        console.log(err);
    }
});
//delete api
router.get("/delete/:id", async (req, res) => {
    try{
        const registerdata = await registerschema.findByIdAndDelete
        (req.params.id);

        //return res.redirect("your url");
        res.redirect('/viewregister');
    }
    catch (err){
        console.log(err);
    }
})


//Editt apii
router.get("/edit/:id", async (req, res) => {
    try{
        const registerdata = await registerschema.findById
        (req.params.id);

        //return res.redirect("your url");
        res.render('dashboard/edit-register',{registerdata: registerdata});
    }
    catch (err){
        console.log(err);
    }
})

// update dataa

router.post('/edit/:id', async (req, res) => {
    const itemId = req.params.id;
    const updatedData ={
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        password: req.body.password,
    }
    //Data to update with

    try {
        const updatedItem = await registerschema.findByIdAndUpdate(itemId,updatedData, { new: true });

        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found'});
        }
        res.redirect('../viewregister');

        //res.json(updatedItem)
    } catch (err) {
        res.status(500).json({ message: 'Server error'});
    }
});




router.get('/register',function(req,res)
{
    res.render('register');
})
// Registration API..
router.post('/register',(req,res) => {
    var regpost=
    {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        password: req.body.password,
       
    };
    var reg = new registerschema(regpost)
reg.save()
.then((item) =>
    res.json('register successfully'))
.catch(err => res.status(400).json('error:' + err));
});


router.get('/login',function(req, res)
{
    res.render('login');
})

router.post('/login',async (req, res) => {
    var email = req.body.email,
    password = req.body.password;

    try {
        var user = await registerschema.findOne({email: email })
        .exec();
        if(!user) {
            res.redirect("/");
        }
        user.comparePassword(password,(error, match) => {
            if(!match) {
                res.redirect("/dashboard");
            }
        });
            req.session.user = user;
        res.redirect("/dashboard");
    }catch (error){
        console.log(error)
      }
});



router.get('/index',function(req,res)
{
    res.render('index');
})



// Detail page api
router.get('/detail',function(req,res)
{
    res.render('detail');
})
router.get("/detail/:id", async (req, res) => {
    try{
        const productdata = await addproductSchema.findById
        (req.params.id);

        //return res.redirect("your url");
        res.render('detail',{productdata: productdata});
    }
    catch (err){
        console.log(err);
    }
})



router.get('/roll',function(req,res)
{
    res.render('roll');
})

router.get('/contact',function(req,res)
{
    res.render('contact');
})


router.get("/viewcontact", async (req,res)=>{
    try{
        const contactdata = await contactusschema1.find({});
        res.render('dashboard/viewcontact', {contactdata: contactdata});
console.log(contactdata);
    }catch (err){
        console.log(err);
    }
});
//contact api
router.post('/contact',(req,res)=>{
    var regpost={
        name:req.body.name,
        email:req.body.email,
        message:req.body.message,
        
    };
    var reg=new contactusschema1(regpost)
    reg.save()
    .then((item) =>
    res.json('register successfully'))
    .catch(err =>res.status(400).json('error:' +err));
}); 


// view contact delete api
router.get("/delete3/:id", async (req, res) => {
    try{
        const contactdata = await contactusschema1.findByIdAndDelete
        (req.params.id);

        //return res.redirect("your url");
        res.redirect('/viewcontact');
    }
    catch (err){
        console.log(err);
    }
});

 router.get('/order',function(req,res)
{
    res.render('order');
})




module.exports=router;

