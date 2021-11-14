/*
** Changes the proxy in package.json for the dev server proxy
** to function properly in a container
*/

const fs = require('fs');

const packageJsonObj = JSON.parse(fs.readFileSync('./package.json', {encoding: 'utf8'}));
if (packageJsonObj.proxy) {
    packageJsonObj.proxy = packageJsonObj.proxy.replace('localhost', process.env.DEV_PROXY_HOST);
}

const packageJsonString = JSON.stringify(packageJsonObj, null, 2);
fs.writeFileSync('./package.json', packageJsonString);
process.exit();