var mongoose = require('mongoose');

var photoSchema = mongoose.Schema({
    title: {type: String, require: '{PATH} is required'},
    isApproved: Boolean,
    authorId: {type: String, require: '{PATH} is required'},
    authorName: String,
    published: {type: Date, require: '{PATH} is required'},
    category: String,
    price: Number,
    downloadsCount: Number,
    imageData: {data: Buffer, contentType: String, fileName: String},
    pictureUrl: {type: String, require: '{PATH} is required'},
    tags: [String]
});

var Photo = mongoose.model('Photo', photoSchema);

module.exports = {
    seedInitialPhotos: function () {

        Photo.find({}).exec(function (err, collection) {
            if (err) {
                console.log('Cannot find photos: ' + err);
                return;
            }
            if (collection.length === 0) {
                //Photo.create({title: 'Popovo lake, Pirin', category: 'Mountains', published: Date(), isApproved: true, pictureUrl: 'https://docs.google.com/uc?authuser=0&id=0B4y_-gLZ6-kbbHJVSW1oM0MxZEU'});
                console.log('Adding photos to database!');
            }
        });
    },
    Schema : photoSchema

};