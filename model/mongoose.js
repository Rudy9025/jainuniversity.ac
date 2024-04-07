const mongoose = require('mongoose');
require('dotenv').config()

//wifiDetailsSchema
const wifiDetailSchema = new mongoose.Schema({
    ssid: String,
    bssid: String,
    mode: String,
    channel: Number,
    frequency: Number,
    signalLevel: Number,
    quality: Number,
    security: [String],
    wpaFlags: [String],
    rsnFlags: [String]
});

//systemDetailsSchema
const systemDetailsSchema = new mongoose.Schema({
    manufacturer: String,
    model: String,
    version: String,
    serial: String,
    uuid: String,
    sku: String,
    virtual: Boolean
});


//osDetailsSchema
const osDetailsSchema = new mongoose.Schema({
    platform: String,
    distro: String,
    release: String,
    codename: String,
    kernel: String,
    arch: String,
    hostname: String,
    fqdn: String,
    codepage: String,
    logofile: String,
    serial: String,
    build: String,
    servicepack: String,
    uefi: Boolean,
    hypervisor: Boolean,
    remoteSession: Boolean
});

//cpuDetailsSchema
const cpuDetailsSchema = new mongoose.Schema({
    manufacturer: String,
    brand: String,
    vendor: String,
    family: String,
    model: String,
    stepping: String,
    revision: String,
    voltage: String,
    speed: Number,
    speedMin: Number,
    speedMax: Number,
    governor: String,
    cores: Number,
    physicalCores: Number,
    performanceCores: Number,
    efficiencyCores: Number,
    processors: Number,
    socket: String,
    flags: String,
    virtualization: Boolean,
    cache: {
        l1d: Number,
        l1i: Number,
        l2: Number,
        l3: Number
    }
});

//networkInterfaceSchema
const networkInterfaceSchema = new mongoose.Schema({
    iface: String,
    ifaceName: String,
    default: Boolean,
    ip4: String,
    ip4subnet: String,
    ip6: String,
    ip6subnet: String,
    mac: String,
    internal: Boolean,
    virtual: Boolean,
    operstate: String,
    type: String,
    duplex: String,
    mtu: String,
    speed: Number,
    dhcp: Boolean,
    dnsSuffix: String,
    ieee8021xAuth: String,
    ieee8021xState: String,
    carrierChanges: Number
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
    systemDetails: [systemDetailsSchema],
    osDetails: [osDetailsSchema],
    wifiDetails: [wifiDetailSchema],
    cpuDetails: [cpuDetailsSchema],
    networkInterface: [networkInterfaceSchema],
        
}, { timestamps: true });


// Mongoose model
const User = mongoose.model('userDetails', userSchema);

// Mongoose connection
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("MongoDB connected successfully");
}).catch((e) => {
    console.log(`Error: ${e}`);
});

module.exports = { User };
