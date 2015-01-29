var express = require('express');
var router = express.Router();
var Review = require('../database/reviews');

router
    .get('/:id?', function (req, res, next) {
        var id = req.params.id;
        if (id) {
            Review.find({
                _id: id
            }, function (err, review) {
                if (err) {
                    res.sendStatus(404);
                } else {
                    res.send(review[0]);
                }
            });
        } else {
            Review.find({}, function (err, reviews) {
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
    Review.create(req.body, function (err, review) {
        res.status(201).send(review);
    });
})

.put('/:id', function (req, res, next) {
    var id = req.params.id;
    Review.update({
            _id: id
        }, req.body,
        function (err, reviews) {
            if (err) {
                res.sendStatus(404);
            } else {
                res.sendStatus(202);
            }
        });
})

.delete('/:id?', function (req, res, next) {
    var id = req.params.id;
    if (id) {
        Review.remove({
            _id: id
        }, function () {
            res.sendStatus(204);
        });

    } else {
        Review.remove({}, function () {
            res.sendStatus(204);
        });
    }

});

module.exports = router;