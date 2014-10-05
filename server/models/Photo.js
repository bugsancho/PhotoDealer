var mongoose = require('mongoose');

var photoSchema = mongoose.Schema({
    title: String,
    isApproved: Boolean,
    author: String,
    published: Date,
    category: String,
    price: Number,
    downloadsCount: Number,
    imageData: {data: Buffer},
    tags: [String]
});

var Photo = mongoose.model('Photo', photoSchema);

module.exports.seedInitialPhotos = function () {
    Photo.find({}).exec(function (err, collection) {
        if (err) {
            console.log('Cannot find photos: ' + err);
            return;
        }

        if (collection.length === 0) {
            Photo.create({title: 'title', isApproved:true});
            Photo.create({title: 'title2', isApproved:true});
            Photo.create({title: 'title3', isApproved:false});
        }
    });
};