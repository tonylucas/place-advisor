var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reviewsSchema = new Schema({
    name: String,
    placeType: String,
    stars: Number
});

var Reviews = mongoose.model('reviews', reviewsSchema);

module.exports = Reviews;