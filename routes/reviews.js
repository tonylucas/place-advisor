var express = require('express');
var router = express.Router();
var Review = require('../database/reviews');

router.route('/')
    .post(function (req, res, next) {
        Review.create(req.body, function (err, review) {
            res.status(201).send(review);
        });
    });


router.route('/create')
.get(function (req, res, next) {
    res.render('create');
})

router.route('/search')
    .get(function (req, res, next) {
        res.render('search');
    });

router.route('/result')
    .get(function (req, res, next) {
        var sendResult = function (err, reviews) {
            if (err != null) {
                res.status(500).send({
                    'error': err
                });
            } else {
                var msg;

                if(!reviews.length){
                    msg = "Aucune review trouvée";
                }

                if (req.accepts('html')) {
                    res.render('search-results', {
                        reviews: reviews,
                        msg: msg
                    });
                } else if (req.accepts('application/json')) {
                    res.send(reviews);
                } else {
                    res.sendStatus(406);
                }   
            }
        }

        // Checking parameters in URL
        if(req.query.name) {
            Review.find({name: req.query.name}, function (err, reviews) {
                sendResult(err, reviews);
            });
        } else if(req.query.stars) {
            Review.find({stars: req.query.stars}, function (err, reviews) {
                sendResult(err, reviews);
            });
        } else if(req.query.type != "") {
            Review.find({placeType: req.query.type}, function (err, reviews) {
                sendResult(err, reviews);
            });
        } else { // Nothing shown if search in URL but no parameters
            Review.find(function (err, reviews) {
                sendResult(err, []);
            });
        }
    });

router.route('/topplaces')
    .get(function (req, res, next) {
        Review.find().sort([['stars', 'descending']]).limit(3).find(function (err, reviews) {
            if (err) {
                res.status(500).send({
                    'error': err
                });
            } else {
                console.log(req.accept);
                if (req.accepts('html')) {
                    res.render('topplaces', {
                        reviews: reviews
                    });
                } else if (req.accepts('application/json')) {
                    res.send(reviews);
                } else {
                    res.sendStatus(406);
                }
            }
        });
    });

router.route('/:id?')
    .get(function (req, res, next) {
            var id = req.params.id;
            if (id) {
                Review.findById(id, function (err, review) {
                    if (err) {
                        res.sendStatus(404);
                    } else {
                        if (req.accepts('html')) {
                            res.render('review', {
                                review: review
                            });
                        } else if (req.accepts('application/json')) {
                            res.send(review);
                        } else {
                            res.sendStatus(406);
                        }
                    }
                });
            } else {
                Review.find(function (err, reviews) {
                    if (err) {
                        res.status(500).send({
                            'error': err
                        });
                    } else {
                        if (req.accepts('html')) {
                            res.render('reviews', {
                                reviews: reviews
                            });
                        } else if (req.accepts('application/json')) {
                            res.send(reviews);
                        } else {
                            res.sendStatus(406);
                        }
                    }
                });

            }
    })
    .put(function (req, res, next) {
        Review.findByIdAndUpdate(
            req.params.id,
            req.body,
            function (err, review) {
                if (err) {
                    res.sendStatus(404);
                } else {
                    res.sendStatus(204);
                }
            });
    })
    .delete(function (req, res, next) {
        var id = req.params.id;
        if (id) {
            Review.findByIdAndRemove(id, function () {
                res.sendStatus(204);
            });

        } else {
            Review.remove({}, function () {
                res.sendStatus(204);
            });
        }
    });

router.route('/edit/:id')
    .get(function (req, res, next) {
        var id = req.params.id;
        if (id) {
            Review.findById(id, function (err, review) {
                if (err) {
                    res.sendStatus(404);
                } else {
                    res.render('edit', {
                        review: review
                    });
                }
            });
        } else {

            res.sendStatus(404);
        }
    });




module.exports = router;