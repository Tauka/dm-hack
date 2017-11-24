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
  res.render('index.ejs');
});

router.get('/terms', function(req, res, next) {
  res.render('terms.ejs');
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
		fs.unlink(req.file.path);

	  if (err) {
	    res.end('upload failed:', err)
	  }

	  if (httpResponse.statusCode = 500) {
	  	res.end("Something went wrong. Please, make sure your submission is properly formatted");
	  }

	  if (body.includes("Please wait one minute")) {
	  	res.end("You have to wait one minute");
	  	return;
	  }

	  
	  let error = 0;
	  try {
	  	error = parseFloat(body.match(/Error rate is (\d+.\d+)/)[1]);	
	  } catch(e) {
	  	res.end("Something went wrong. Please, make sure your submission is properly formatted. Exception: " + e);
	  }
	  

	  Results.findOneAndUpdate({error: error}, {
			$set: {
				name: req.body.username
			}
		}, {
			new: true
		}, function(err, dupResult) {
		  	if (err) throw err;

		  	if (dupResult != null) {

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
		  			// console.log(dupResult._id)
		  			// allResults.forEach((result, index) => {
		  			// 	console.log(result._id)
		  				

		  			// 	if (result._id === dupResult._id) {
		  			// 		console.log("FOUND!");
		  			// 		console.log(index);
		  			// 		place = index;
		  			// 	}
		  			// });


		  			for (let i = 0; i < allResults.length; i++) {
		  				if (allResults[i]._id.equals(dupResult._id)) {
		  					place = i + 1;
		  				}
		  			}

		  			res.render('leaderboard.ejs', {results: allResults, place: place});
		  		});	

		  	} else {
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

		  				res.render('leaderboard.ejs', {results: allResults, place: place});
		  			});	
		  		});
		  	}

		  	

	  	
	  });

	  
	});	
});

router.get('/results', function(req, res, next) {
	Results.find({}, function(err, results) {
		if (err) throw err;
		res.render('leaderboard.ejs', {results: results, place: null});
	});	
})



module.exports = router;
