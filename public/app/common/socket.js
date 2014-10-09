app.factory('socket', function (notifier) {
   var socket = io.connect('http://localhost:3434');
    var isSubscribed = false;
    return {
        subscribe: function (channel) {
            if (!isSubscribed) {
                socket.on(channel, function (data) {
                    notifier.success(data);
                });
                isSubscribed = true;
            }
        },
        unsubscribe : function (channel) {
            isSubscribed = false;
            socket.removeAllListeners(channel);
        }
    }
});