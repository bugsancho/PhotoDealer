var path = require('path');
var rootPath = path.normalize(__dirname + '/../../')

module.exports = {
    development: {
        rootPath: rootPath,
       // db: 'mongodb://admin:admin@ds063889.mongolab.com:63889/photodealer',
        db: 'mongodb://localhost/photodealer',
        port: process.env.PORT || 3030
    },
    production: {
        rootPath: rootPath,
        db: 'mongodb://admin:admin@ds063889.mongolab.com:63889/photodealer',
        port: process.env.PORT || 3030
    }
};