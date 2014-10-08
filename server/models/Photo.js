var mongoose = require('mongoose');

var photoSchema = mongoose.Schema({
    title: String,
    isApproved: Boolean,
    authorId: String,
    authorName: String,
    published: Date,
    category: String,
    price: Number,
    downloadsCount: Number,
    imageData: {data: Buffer, contentType: String, fileName: String},
    pictureUrl: String,
    tags: [String]
});

var Photo = mongoose.model('Photo', photoSchema);

module.exports = {
    seedInitialPhotos: function () {

     //  Photo.remove({}, function (err) {
     //      console.log('Photos removed')
     //  })
        Photo.find({}).exec(function (err, collection) {
            if (err) {
                console.log('Cannot find photos: ' + err);
                return;
            }
            if (collection.length === 0) {
                Photo.create({title: 'Unicorn', category: 'Unicorns', published: Date(), isApproved: true, pictureUrl: 'http://addyosmani.com/blog/wp-content/uploads/2013/04/unicorn.jpg'});
                Photo.create({title: 'Unicorn1', category: 'Unicorns', published: Date(), isApproved: true, pictureUrl: 'http://addyosmani.com/blog/wp-content/uploads/2013/04/unicorn.jpg'});
                console.log('Adding photos to database!');
            }
        });
    },
    Schema : photoSchema

};