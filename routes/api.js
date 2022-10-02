const express = require('express');
const Ninja = require('../models/ninja');
const router = express.Router();


// get a list of ninjas from the db
router.get('/ninjas', function(req, res, next) {
    // find all ninjas
    // Ninja.find({}).then(function(ninjas) {
    //     res.send(ninjas);
    // });
    Ninja.aggregate().near({
        near: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
        maxDistance: 1,
        spherical: true,
        distanceField: "dist.calculated"
    }).then(function(ninjas){
        res.send(ninjas);
    }).catch(next);
});

// add a new ninja to the db
router.post('/ninjas', function(req, res, next) {
    // console.log(req.body);

    // save new ninja in database
    // if create successully respond to client
    Ninja.create(req.body).then(function(ninja){
        res.send(ninja);
    }).catch(next);
    // send it back
    // res.send({
    //     type:'POST',
    //     name: req.body.name,
    //     rank: req.body.rank
    // });
});

// update a ninja in the db
router.put('/ninjas/:id', function(req, res, next) {
    Ninja.findByIdAndUpdate({_id:req.params.id}, req.body).then(function(){
        // otherwise the ninja is still the old one
        Ninja.findOne({_id: req.params.id}).then(function(ninja){
            res.send(ninja);
        });
    }).catch(next);
});

// delete a ninja in the db
// :id means use it as a parameter
router.delete('/ninjas/:id', function(req, res, next) {
    // findByIdAndRemove is builtin function of mongo
    Ninja.findByIdAndRemove({_id:req.params.id}).then(function(ninja){
        res.send(ninja);
    }).catch(next);
});


module.exports = router;

