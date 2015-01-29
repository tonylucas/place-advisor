var express = require('express');
var router = express.Router();
var Review = require('../database/reviews');

router
    .get('/:id?', function (req, res, next) {
        var id = req.params.id;
        if (id) {
            var review;

            Reviews.find({
                _id: id
            }, function (err, reviews) {
                if (err) {
                    console.log(err);
                    res.sendStatus(404);
                } else {
                    res.send(review);
                }
            });
        } else {
            Reviews.find({}, function (err, reviews) {
                if (err) {
                    res.status(500).send({
                        'error': err
                    });
                } else {
                    res.send(reviews);
                }
            });

        }
    })


.post('/', function (req, res, next) {
    Review.create(req.body, function(err, review){
        res.status(201).send(review); 
    });
})

.put('/:id', function (req, res, next) {
    reviews.forEach(function (r) {
        if (r.id == req.params.id) {
            var index = reviews.indexOf(r);
            console.log(req.body);
            reviews[index] = req.body;
            res.sendStatus(202);
        }
    });
})

.delete('/:id?', function (req, res, next) {
    var id = req.params.id;
    if (id) {
//        var index;
//        reviews.forEach(function (review) {
//            if (review.id == id) {
//                index = reviews.indexOf(review);
//                console.log(index);
//            }
//        });
//        if (index) {
//            reviews.splice(index, 1);
//            res.sendStatus(204);
//        } else {
//            res.sendStatus(404);
//        }
        Reviews.remove({_id: id}, function(){
            res.sendStatus(204); 
        });

    } else {
        Reviews.remove({}, function(){
            res.sendStatus(204); 
        });
    }

});

module.exports = router;