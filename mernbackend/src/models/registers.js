const mongoose = require("mongoose");

const DB='mongodb+srv://apnadhaba:apnadhaba2024@cluster0.cjwrq.mongodb.net/buzzlinestack?retryWrites=true&w=majority'; 

mongoose.connect(DB, {
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(() => {
    console.log(`connection succesful`);
}).catch((err) => console.log(`no connection`));

const customerSchema = new mongoose.Schema({
    fullname : {
        type:String,
        required:true
    },
    email : {
        type:String,
        required:true,
        unique: true
    },
    username : {
        type:String,
        required:true
    },
    password : {
        type:String,
        required:true
    }
})

// now we need to create collections

const Register = new mongoose.model("Register", customerSchema);

module.exports = Register;