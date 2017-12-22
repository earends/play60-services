const mongoose = require('mongoose');
const listingModel = require('../models/listingModel')
const Listing = mongoose.model('Listing');
const mailHelper = require('./mailHelper');


module.exports = {
	newListing(req, res) {
		const newListing = new Listing(req.body);
		newListing.save((err, listing) => {
			if (err) 
				res.json(err);
            mailHelper.sendListingDetails(req.body.email,listing._id);
			res.send(listing);
		});

	},
	allListings(req, res) {
		Listing.find({"isVerified": true}, (err, listing) => {
			if (err) 
				res.json(err);
      

			res.send(listing);
		});
	},
	listingDetails(req, res) {
		Listing.findOne({'_id': req.params.id} , (err, listing) => {
				if (err)
					res.json(err);
				else {
					res.send(listing);
				}
			});
	},
	clearAll(req, res){
		Listing.remove({}, (err, listing) => {
			if(err)
				res.json(err)

			res.send(listing)
		})

	},

	verifyListing(req,res) {
        Listing.findOneAndUpdate(
            { _id: req.params.id },
            {isVerified: true},
            (err, user) => {
                if (err)
                    res.json(err);
                //redirect user to home page after listing was verified
				res.redirect('https://connectgu.herokuapp.com/Home');
            });
	},

	editListing(req,res) {
		// when the user posts it will be a new object for the listing
		Listing.findOneAndUpdate({ _id: req.params.id }, req.body,
			(err, user) => {
				if (err) 
					res.json(err);
				res.json({ message: 'listing updated', user });
			});
	},
	deleteListing(req,res) {
		// when the user clicks link post will be deleted
        Listing.remove({ _id: req.params.id }, (err, listing) => {
            if (err)
                return res.json(err);


            res.json({listing});
        });
	},
    getByLocation(req,res) {
        Listing.find({"location":req.params.lid,"isVerified": true}, (err, listing) => {
            if (err)
                res.json(err);


            res.send(listing);
        });
	},
	getByGame(req,res) {
        Listing.find({'game': req.params.gid,"isVerified": true}, (err, listing) => {
            if (err)
                res.json(err);


            res.send(listing);
        });
	},
    getByRecent(req,res) {
        Listing.find({"isVerified": true}).sort('-timestamp').exec(function(err, docs) {
        	if (err)
        		res.json(err)
			res.send(docs)
		});
	},
    getByPopularity(req,res) {
        Listing.aggregate([{"$sortByCount": "$game"}]).exec(function(err, docs) {
            if (err)
                res.json(err)
			if (docs[0]._id ===null) {
                Listing.find({"isVerified": true}, (err, listing) => {
                    if (err)
                        res.json(err);


                    res.send(listing);
                });
			} else {
                Listing.find({'game': docs[0]._id,"isVerified": true}, (err, listing) => {
                    if (err)
                        res.json(err);


                    res.send(listing);
                });
			}


        });
	}
};
