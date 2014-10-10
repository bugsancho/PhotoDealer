var path = require('path');
var rootPath = path.normalize(__dirname + '/../../')

module.exports = {
    development: {
        rootPath: rootPath,
       // db: 'mongodb://admin:admin@ds033380.mongolab.com:33380/photodealer',
        db: 'mongodb://localhost/photodealer',
        port: process.env.PORT || 3030
    },
    production: {
        rootPath: rootPath,
        db: 'mongodb://admin:admin@ds033380.mongolab.com:33380/photodealer',
        port: process.env.PORT || 3030
    }
};