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
                Photo.create({title: 'Popovo lake, Pirin', category: 'Mountains', published: Date(), isApproved: true, pictureUrl: 'https://docs.google.com/uc?authuser=0&id=0B4y_-gLZ6-kbbHJVSW1oM0MxZEU'});
                console.log('Adding photos to database!');
            }
        });
    },
    Schema : photoSchema

};