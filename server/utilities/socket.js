var io = require('socket.io').listen(3434);

module.exports = {
    sendMessage: function (channel, message) {
        io.emit(channel, message);

    }
};