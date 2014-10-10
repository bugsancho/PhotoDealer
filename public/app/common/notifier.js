app.factory('notifier', function(toastr) {
    return {
        success: function(msg) {
            toastr.success(msg);
        },
        error: function(msg) {
            if(msg.data){
                if(msg.data.reason){
                    toastr.error(msg.data.reason);
                }
                else if(msg.data.message){
                    toastr.error(msg.data.message);
                }
                else{
                    toastr.error(msg.data);
                }
            }
            else if(msg.message){
                toastr.error(msg.message);
            }
            else {
                toastr.error(msg);
            }
        }
    }
});