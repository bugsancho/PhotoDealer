var Category = require('mongoose').model('Category');

module.exports = {
    getAllCategories: function (req, res, next) {
        Category.find({}).exec(function (err, collection) {
            if (err) {
                console.log('Categories could not be loaded: ' + err);
            }

            res.send(collection);
        })
    },
    createCategory: function (req, res, next) {
        var newCategoryData = req.body;

        Category.create(newCategoryData, function (err, user) {
            if (err) {
                console.log('Failed to create new category: ' + err);
                res.status(400);

                return res.send({reason: err.toString()});
            }

            console.log('Category ' + newCategoryData.title + ' added!');
        });
    }
};