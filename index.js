const { address } = require("address");
const express = require("express");
const { User } = require("./model/mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const { UserInfo, KernelVersion, Hostname, MachineType, Architecture, AvailableParallelism, CpuCoresResult, Homedirectory, NetworkInterfaces, Platform, Release, Tmpdirectory, TotalMemory, FreeMemory, OsType, } = require("./model/os");
const cors = require("cors");

require("dotenv").config();
const app = express();

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "index");
});

// Middleware to get IP address --------------------------------start------------------------------
app.use(async (req, res, next) => {
  try {
    const addrs = await getAddress();
    req.addrs = addrs;
    next();
  } catch (error) {
    console.error("Error getting address:", error);
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

// Post data into database
app.post("/userSignup", async (req, res) => {
  const body = req.body;
  try {
    const result = await User.create({
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      password: body.password,
      ipv6_address: req.addrs.ipv6,
      public_ipv4: req.addrs.ip,
      MAC_address: req.addrs.mac,
      OS_NetworkDetails: {
        username: UserInfo.username,
        kernelVersion: KernelVersion,
        hostname: Hostname,
        machineType: MachineType,
        architecture: Architecture,
        availableParallelism: AvailableParallelism,
        cpuCores: CpuCoresResult,
        homedir: Homedirectory,
        networkInterfaces: NetworkInterfaces,
        platform: Platform,
        release: Release,
        tmpdir: Tmpdirectory,
        totalMemory: TotalMemory,
        freeMemory: FreeMemory,
        osType: OsType,
      },
    });
    console.log(result);
    console.log("Inserted successfully");
    return res.redirect("/signup_success.html");
  } catch (error) {
    console.error("Error inserting data into database:", error);
    res.status(500).json("Internal Server Error");
  }
});

// Login data
app.post("/userLogin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }
  try {
    const result = await User.find({});
    const user = await User.findOne({ email, password });

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      res.json(result);
    } else if (!user) {
      res.sendFile(path.join(__dirname, "public", "invalid.html"));
    } else {
      res.sendFile(path.join(__dirname, "public", "Login_success.html"));
    }
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Internal Server Error." });
  }
});

app.listen(port, () => {
  console.log(`Server started at port:${port}`);
});
