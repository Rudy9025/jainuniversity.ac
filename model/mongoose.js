const mongoose = require('mongoose');
require('dotenv').config()


//os_Network schema
const OS_NetworkDetailsSchema = new mongoose.Schema({
    username: String,
    kernelVersion: String,
    hostname: String,
    machineType: String,
    architecture: String,
    availableParallelism: Number,
    cpuCores: [{
        model: String,
        speed: String,
        times: {
            user: String,
            nice: String,
            sys: String,
            idle: String,
            irq: String,
        }
    }],
    homedir: String,
    networkInterfaces: mongoose.Schema.Types.Mixed, // Since networkInterfaces is an object with varying structure
    platform: String,
    release: String,
    tmpdir: String,
    totalMemory: Number,
    freeMemory: Number,
    osType: String
});


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
    OS_NetworkDetails:[OS_NetworkDetailsSchema]     
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
