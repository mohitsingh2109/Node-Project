const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://mohitrana1577:mohitsingh12@cluster0.f3qn9.mongodb.net/user?retryWrites=true&w=majority&appName=Cluster0",

{
 useNewUrlParser: true,
 useUnifiedTopology: true
})
.then(()=> console.log("connection successfully.."))
.catch((err) => console.log(err));



const listSchema = new mongoose.Schema({
    name:
    {
        type: String,
        require: true
    },
    email:
    {
        type: String,
        require: true
    },

    // active:Boolean

    date:
    {
        type:Date,
        default:Date.now
    }
})



const Playlist = new mongoose.model("Playlist",listSchema);

const createDocument = async () => {
    try{
        const productList2 = new Playlist({
            name: 'sita',
            email:'mohitsingh12@gmail.com'
             })

             const productList3 = new Playlist({
                name: 'geeta',
                email:'geeta@gmail.com'
                 })

                 const productList4 = new Playlist({
                    name: 'rahul',
                    email:'rahul@gmail.com'
                     })

                     const result = await Playlist.insertMany([productList2,productList3,productList4]);
                     console.log(result);
    } catch (err){
        console.log(err);

    }
}

createDocument();