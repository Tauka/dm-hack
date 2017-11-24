var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');

var Results = require('../models/results');

var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log("DAMN!");
  res.render('index', { title: 'Express' });
});

router.get('/fileupload', function(req, res, next) {
	console.log("EPTA");
	res.end("tauka");
});

router.post('/fileupload', upload.single('dm'), function(req, res, next) {
	// console.log(req);
	console.dir(req.file);
	console.log(req.body.username);

	if (req.body.username == "" || req.body.username == null) {
		res.end("Please, provide your name!");
	}


	var formData = {
	  // Pass a simple key-value pair
	  csciclass: 'csci344',
	  // Pass data via Streams
	  file: fs.createReadStream(req.file.path)
	};



	request.post({url:'http://datatanu.com:8080/contestwebapp/uploadfinal', formData: formData}, function(err, httpResponse, body) {
	  if (err) {
	    return console.error('upload failed:', err);
	  }

	  if (body.includes("Please wait one minute")) {
	  	res.end("You have to wait one minute");
	  	return;
	  }

	  
	  

	  error = parseFloat(body.match(/Error rate is (\d+.\d+)/)[1]);

	  Results.create({
	  	name: req.body.username,
	  	error: error
	  }, function (err, savedResult) {
	  	if (err) throw err;


	  	Results.find({}, function(err, allResults) {
	  		let place = -1;

	  		allResults.sort((a, b) => {
	  			if (a.error < b.error) {
	  				return -1;
	  			} else if (a.error > b.error) {
	  				return 1;
	  			}

	  			return 0;
	  		});
	  		console.log(savedResult._id)
	  		allResults.forEach((result, index) => {
	  			console.log(result._id)
	  			
	  			
	  			if (result._id == savedResult._id) {
	  				place = index;
	  			}
	  		});

	  		res.render('leaderboard', {results: allResults, place: place});
	  	});	
	  });
	});	
});

router.get('/results', function(req, res, next) {
	Results.find({}, function(err, results) {
		if (err) throw err;
		console.log(results);
		res.render('leaderboard', {results: results});
	});	
})



module.exports = router;
