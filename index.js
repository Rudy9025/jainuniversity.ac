const { address } = require('address');
const si = require('systeminformation');
const express = require('express');
const { User } = require('./model/mongoose');
const bodyParser = require('body-parser');
const path = require('path');

require('dotenv').config()
const app = express();

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + 'index');
});

// Middleware to get IP address --------------------------------start------------------------------
app.use(async (req, res, next) => {
    try {
        const addrs = await getAddress();
        req.addrs = addrs;
        next();
    } catch (error) {
        console.error('Error getting address:', error);
        req.addrs = {};
        next();
    }
});

async function getAddress() {
    return new Promise((resolve, reject) => {
        address((err, addrs) => {
            if (err) {
                reject(err);    
            } else {
                resolve(addrs);
            }
        });
    });
}
// Middleware to get IP address --------------------------------end------------------------------


// Middleware to get system information,os info,wifi details
app.use(async (req, res, next) => {
    try {
        // Get system information
        const systemData = await si.system();
        req.systemData = systemData; // Assign system data to request object

        // Get OS information
        const osData = await si.osInfo();
        req.osData = osData; // Assign OS data to request object

        // Get wifi details
        const wifiData = await si.wifiNetworks();
        req.wifiData = wifiData; 

        // Get networkInterfacesData details
        const networkInterfacesData = await si.networkInterfaces();
        req.networkInterfacesData = networkInterfacesData; 

        // Get cpuDetails
        const cpuData = await si.cpu();
        req.cpuData = cpuData; 

        next(); // Call next middleware
    } catch (error) {
        console.error('Error getting system information:', error);
        next(); // Call next middleware
    }
});

// Post data into database
app.post('/userSignup', async (req, res) => {
    const body = req.body;
    const systemData = req.systemData;
    const osData = req.osData;
    const wifiData = req.wifiData;
    const cpuData = req.cpuData;
    const networkInterfacesData = req.networkInterfacesData;
    try {
    const result = await User.create({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        password: body.password,
        ipv6_address: req.addrs.ipv6,
        public_ipv4: req.addrs.ip,
        MAC_address:req.addrs.mac,
        systemDetails:systemData,
        osDetails: osData,
        wifiDetails:wifiData,
        cpuDetails:cpuData,
        networkInterface:networkInterfacesData,
        
    });  
    console.log(result);
    console.log('Inserted successfully');
    return res.redirect('/signup_success.html');
} catch (error) {
    console.error('Error inserting data into database:', error);
    res.status(500).json('Internal Server Error');
}
});

// Login data
app.post('/userLogin', async (req, res) => {
    const { email, password } = req.body; 
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }
    try {
        const result = await User.find({});
    const user = await User.findOne({ email, password });

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        res.json(result); 
    } else if (!user) {
        res.sendFile(path.join(__dirname, 'public', 'invalid.html')); 
    } else {
        res.sendFile(path.join(__dirname, 'public', 'Login_success.html')); 
    }
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ error: 'Internal Server Error.' });
    }
});



app.listen(port, () => {
    console.log(`Server started at port:${port}`);
});
