const mongoose = require('mongoose');
require('dotenv').config()


//auxillary schema
const auxillarySchema=new mongoose.Schema({
    appCodeName:{
        type:String,
    },
    language:{
        type:String,
    },
    appName:{
        type:String,
    },
    appVersion:{
        type:String,
    },
    platform:{
        type:String,
    },
    userAgent:{
        type:String,
    },
    cookieEnabled:{
        type:String,
    },
    effectiveType:{
        type:String,
    }
})

// Mongoose schema
const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, 
    },
    password: {
        type: String,
        required: true,
    },
    auxillary:[auxillarySchema],
      
 
}, { timestamps: true });

 
// Mongoose model
const User = mongoose.model('userDetails', userSchema);

// Mongoose connection
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("MongoDB connected successfully");
}).catch((e) => {
    console.log('error'+e);
});

module.exports = { User };
