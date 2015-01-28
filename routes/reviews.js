var express = require('express');
var router = express.Router();

var reviews = [
    {
        id: 1,
        name: 'McDo',
        placeType: 'Fastfood',
        stars: 3
    }, {
        id: 2,
        name: 'Quick',
        placeType: 'Fastfood',
        stars: 2
    }, {
        id: 3,
        name: 'Domino\'s Pizza',
        placeType: 'Restaurant',
        stars: 4
    }
]

router.get('/:id?', function (req, res, next) {
    var id = req.params.id;
    if (id) {
        var review;
        reviews.forEach(function (r) {
            if (r.id == id)
                review = r;
        });

        if (review) {
            res.render('review', {
                review: review
            });
        } else {
            res.render('review', {
                msg: "Review introuvable :/"
            });
        }
    } else {
        res.send(reviews);
        res.render('reviews', {
            reviews: reviews
        });
    }
});


router.post('/', function (req, res, next) {
    reviews.push(req.body);
    res.sendStatus(201);
});

router.delete('/', function (req, res, next) {
    reviews = [];
});

router.delete('/:id', function (req, res, next) {
    reviews.forEach(function (r) {
        if (r.id == req.params.id) {
            var index = reviews.indexOf(r);
            console.log(index);
            reviews.splice(index, 1);
        }
    });
    res.send(reviews);
});

module.exports = router;