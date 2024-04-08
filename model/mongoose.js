const mongoose = require('mongoose');
require('dotenv').config()

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
    ipv6_address: {
        type: String,
    },
    public_ipv4: {
        type: String,
    },
    MAC_address: {
        type: String,
    },   
 
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
