const appCodeName=navigator.appCodeName
const language=navigator.language;
const appName=navigator.appName
const appVersion=navigator.appVersion
const platform=navigator.platform;
const userAgent=navigator.userAgent;
const cookieEnabled=navigator.cookieEnabled ? "Enabled" : "Disabled"
const effectiveType=navigator.connection.effectiveType

module.exports={
    appCodeName,language,appName,appVersion,platform,userAgent,cookieEnabled,effectiveType
}
