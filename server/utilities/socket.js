var io = require('socket.io').listen(3434);
var socket = io;;

module.exports = {
//    config: function (app) {
//        socket = io(app);
//    },
    sendMessage: function (channel, message) {
       socket.emit(channel, message);
    }
};