var mongoose = require('mongoose'),
    encryption = require('../utilities/encryption');

var transactionSchema = mongoose.Schema({
    fromUserId: {type: String, require: '{PATH} is required'},
    toUserId: {type: String, require: '{PATH} is required'},
    fromUserNames: {type: String, require: '{PATH} is required'},
    toUserNames: {type: String, require: '{PATH} is required'},
    photoId: {type: String, require: '{PATH} is required'},
    photoName: {type: String, require: '{PATH} is required'},
    date: {type: Date, require: '{PATH} is required'},
    amount: {type: Number, require: '{PATH} is required'}
});


var Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = {
    seedInitialTransactions: function () {

        Transaction.find({}).exec(function (err, collection) {
            if (err) {
                console.log('Cannot find transactions: ' + err);
                return;
            }

            if (collection.length === 0) {

            }
        });
    },
 Schema: transactionSchema
};