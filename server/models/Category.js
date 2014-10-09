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
                Category.create({title: 'Landscape'});
                Category.create({title: 'Birds'});
                Category.create({title: 'Mammals'});
                Category.create({title: 'Flowers'});
                Category.create({title: 'Insects'});
                Category.create({title: 'Portrait'});
                Category.create({title: 'Architecture'});
                Category.create({title: 'Sky'});
                Category.create({title: 'Other'});
                Category.create({title: ''});

                console.log('Adding categories to database!');
            }
        });
    }, Schema : categorySchema
};