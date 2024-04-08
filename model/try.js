const { first, all } = require('macaddress-local-machine');
const https = require('https');
const { ProxyAgent } = require('proxy-agent');

// Get MAC addresses
const macAddresses = [first(), all()];

// Create a new ProxyAgent
const agent = new ProxyAgent();

// Create HTTPS request options
const options = {
  hostname: 'jsonip.com',
  port: 443,
  path: '/',
  method: 'GET',
  agent: agent
};

// Create a promise to handle the request
const makeRequest = new Promise((resolve, reject) => {
  const Request = https.request(options, (res) => {
    let final = ["status code: "+res.statusCode, res.headers];
    let ip = '';

    // Listen for data events on the response to capture the IP address
    res.on('data', (chunk) => {
      ip += chunk;
    });

    // Listen for the end of the response to resolve the promise
    res.on('end', () => {
 // Log the IP address here
      resolve({ final, ip });
    });
  });

  // Listen for errors on the request
  Request.on('error', (error) => {
    reject(error);
  });

  // End the request
  Request.end();
});

// Export macAddresses and makeRequest
module.exports = { macAddresses, makeRequest };
