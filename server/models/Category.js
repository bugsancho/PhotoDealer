var mongoose = require('mongoose');

var categorySchema = mongoose.Schema({ title: String });

var Category = mongoose.model('Category', categorySchema);

module.exports = {
    seedInitialCategories: function () {
        Category.find({}).exec(function (err, collection) {
            if (err) {
                console.log('Cannot find categories: ' + err);
                return;
            }

            if (collection.length === 0) {
                Category.create({title: 'Cats'});
                Category.create({title: 'Dogs'});
                Category.create({title: 'Unicorns'});
                Category.create({title: 'Spiders'});
                Category.create({title: 'Snakes'});

                console.log('Adding categories to database!');
            }
        });
    }, Schema : categorySchema
};