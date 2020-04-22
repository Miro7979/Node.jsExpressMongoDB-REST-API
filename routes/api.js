const express = require('express');
const router = express.Router();
const Person = require('../models/People');

// GET list of people
router.get('/people', (req, res, next) => {
  // person.find().then((persons) => {
  //   res.send(persons);
  // });
  Person.aggregate([{
    $geoNear: {
      near: {
        'type': 'Point',
        'coordinates': [parseFloat(req.query.lng), parseFloat(req.query.lat)]
      },
      distanceField: "dist.calculated",
      maxDistance: 100000,
      spherical: true
    }
  }]).then((persons) => {
      res.send(persons);
  }).catch(next);
});

// Add a new person
router.post('/people', (req, res, next) => {
  // let person = new Person(req.body);
  // person.save();
  Person.create(req.body).then((person) => {
    res.send(person);
  }).catch(next);
});

// Update a person
router.put('/people/:id', (req, res, next) => {
  Person.findByIdAndUpdate({_id: req.params.id}, req.body).then(() => {
    Person.findOne({_id: req.params.id}).then((person) => {
      res.send(person);
    });
  });
});

// Delete a person
router.delete('/people/:id', (req, res, next) => {
  Person.findByIdAndRemove({_id: req.params.id}).then((person) => {
    res.send(person);
  });
});

module.exports = router;