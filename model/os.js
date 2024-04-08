const os = require('os');

const UserInfo = os.userInfo({ encoding: 'utf8' });
const KernelVersion = os.version();
const Hostname = os.hostname();
const MachineType = os.machine();
const Architecture = os.arch();
const AvailableParallelism = os.availableParallelism();
const Homedirectory = os.homedir();
const NetworkInterfaces = os.networkInterfaces();
const Platform = os.platform();
const Release = os.release();
const Tmpdirectory = os.tmpdir();
const TotalMemory = os.totalmem();
const FreeMemory = os.freemem();
const OsType = os.type();

const CpuCores = os.cpus();
let CpuCoresResult = [];
CpuCores.forEach((core, index) => {
   const coreInfo = {
       coreNumber: index + 1,
       model: core.model,
       speed: core.speed,
       times: {
           user: core.times.user,
           nice: core.times.nice,
           sys: core.times.sys,
           idle: core.times.idle,
           irq: core.times.irq
       }
   };
   CpuCoresResult.push(coreInfo);
});

module.exports = {
    UserInfo,
    KernelVersion,
    Hostname,
    MachineType,
    Architecture,
    AvailableParallelism,
    CpuCoresResult,
    Homedirectory,
    NetworkInterfaces,
    Platform,
    Release,
    Tmpdirectory,
    TotalMemory,
    FreeMemory,
    OsType
};
