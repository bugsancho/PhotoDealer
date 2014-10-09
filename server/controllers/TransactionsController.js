var Transaction = require('mongoose').model('Transaction');

module.exports = {
    getAllTransactions: function (req, res, next) {
        Transaction.find({}).exec(function (err, collection) {
            if (err) {
                console.log('Transaction could not be loaded: ' + err);
            }

            res.send(collection);
        })
    }
};