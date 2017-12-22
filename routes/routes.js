const listHelper = require('../controllers/listingHelper');
const commentHelper = require('../controllers/commentHelper');

module.exports = function (app) {

	app.route('/listings')
		.get(listHelper.allListings) // get all listings for view listings page
		.delete(listHelper.clearAll) // delete all listings for test purposes
		.post(listHelper.newListing) // create a listing for create listing page

	app.route('/listings/:id') // get listing details by id for Listing page
		.get(listHelper.listingDetails)


	app.route('/listings/verify/:id') // user routes here to verify then redirect to confirm listing
		.get(listHelper.verifyListing)

	app.route('/listings/edit/:id')
		.post(listHelper.editListing) // edit listing post to update listing

	app.route('/listings/delete/:id')
		.delete(listHelper.deleteListing) // delete listing


	app.route('/listings/location/:lid')
		.get(listHelper.getByLocation) // get listings by location

	app.route('/listings/game/:gid')
		.get(listHelper.getByGame) // get listings by game

	app.route('/recent')
		.get(listHelper.getByRecent) // get listings by timestamp

	app.route('/popularity')
		.get(listHelper.getByPopularity) // get listings by sport most commonly posted

    app.route('/comments/:pid')
        .get(commentHelper.getCommentsByPost) // get comments by posting id
		.delete(commentHelper.deleteCommentsByPost) // delete all comment by posting id

    app.route('/comment/:id')
        .get(commentHelper.verifyComment) // verify comment

	app.route('/commentDelete/:id')
		.get(commentHelper.deleteComment) // delete individual comment

	app.route('/allComments')
		.get(commentHelper.all)


    app.route('/comments')
        .get(commentHelper.allComments) // get all coments testing purpose
        .delete(commentHelper.clearAll) // clear all comments testing
        .post(commentHelper.postComment) // post a new comment


	
};
