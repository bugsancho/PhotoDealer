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
    pictureUrl: String,
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
            Photo.create({title: 'Unicorn', category: 'Unicorns', published: Date(), isApproved: true, pictureUrl: 'http://addyosmani.com/blog/wp-content/uploads/2013/04/unicorn.jpg'});
            Photo.create({title: 'Unicorn1', category: 'Unicorns', published: Date(), isApproved: true, pictureUrl: 'http://addyosmani.com/blog/wp-content/uploads/2013/04/unicorn.jpg'});
            Photo.create({title: 'Unicorn2', category: 'Unicorns', published: Date(), isApproved: true, pictureUrl: 'http://th01.deviantart.net/fs71/PRE/i/2013/250/a/d/__sold__hand_made_poseable_cloud_dancer_unicorn__by_wood_splitter_lee-d6ez3g3.jpg'});
            Photo.create({title: 'Unicorn3', category: 'Unicorns', published: Date(), isApproved: true, pictureUrl: 'http://th01.deviantart.net/fs71/PRE/i/2013/250/a/d/__sold__hand_made_poseable_cloud_dancer_unicorn__by_wood_splitter_lee-d6ez3g3.jpg'});
            Photo.create({title: 'Unicorn4', category: 'Unicorns', published: Date(), isApproved: true, pictureUrl: 'http://addyosmani.com/blog/wp-content/uploads/2013/04/unicorn.jpg'});
            Photo.create({title: 'Unicorn5', category: 'Unicorns', published: Date(), isApproved: true, pictureUrl: 'http://addyosmani.com/blog/wp-content/uploads/2013/04/unicorn.jpg'});
            Photo.create({title: 'Unicorn6', category: 'Unicorns', published: Date(), isApproved: true, pictureUrl: 'http://addyosmani.com/blog/wp-content/uploads/2013/04/unicorn.jpg'});
            console.log('Adding photos to database!');
        }
    });
};