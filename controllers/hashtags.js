var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var Hashtag = require('../models/hashtags');
// GET all tracked hashtags from the database
router.get('/', function(req, res, next) {
	console.log('Getting all tracked hashtags from the DB...');
	Hashtag.find(function(error, data) {
		if (error) return error;
		res.json(data);
	});
});

// GET a single tracked hashtag by objectID
router.get('/:id', function(req, res, next) {
	console.log('Getting tracked hash tag with ObjectID: ' + req.params.id);
	Hashtag.findById(req.params.id, function(error, data) {
		if (error) return error;
		res.json(data);
	});
});

// POST a newly tracked hashtag to the database
router.post('/', function(req, res, next) {
	console.log('Posting a new tracked hashtag to the database');
	Hashtag.create(req.body, function(error, data) {
		if (error) return error;
		res.json(data);
	});
});

// PUT/PATCH an update to an existing hashtag
router.put('/:id', function(req, res, next) {
	console.log('Updating a tracked hashtag with ObjectID: ' + req.params.id);
	Hashtag.findByIdAndUpdate(req.params.id, req.body, function(error, data) {
		if (error) return error;
		res.json(data);
	});
});

router.patch('/:id', function(req, res, next) {
	console.log('Updating a tracked hashtag with ObjectID: ' + req.params.id);
	Hashtag.findByIdAndUpdate(req.params.id, req.body, function(error, data) {
		if (error) return error;
		res.json(data);
	});
});

// DELETE a tracked hashtag by ID
router.delete('/:id', function(req, res, next) {
	console.log('Deleting tracked hashtag with ObjectID: ' + req.params.id);
	Hashtag.findByIdAndRemove(req.params.id, function(error, data) {
		if (error) return error;
		res.json(data);
	});
});
module.exports = router;