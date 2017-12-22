const mongoose = require('mongoose');
const commentModel = require('../models/commentModel');
const Comment = mongoose.model('Comment');
const mailHelper = require('./mailHelper');

module.exports = {
    allComments(req, res) {
        Comment.find({"isVerified": true}, (err, comments) => {
            if (err)
                res.json(err);


            res.send(comments);
        });
    },
    postComment(req,res) {
        const newComment = new Comment(req.body);
        newComment.save((err, comment) => {
            if (err)
                res.json(err);
            mailHelper.sendCommentDetails(req.body.email,comment._id);

            res.send(comment);
        });
    },
    deleteCommentsByPost(req,res) {
        Comment.remove({pid:req.params.pid,}, (err, comment) => {
            if(err)
                res.json(err)

            res.send(comment)
        })
    },
    getCommentsByPost(req,res) {
        Comment.find({"pid":req.params.pid,"isVerified": true}, (err, comments) => {
            if (err)
                res.json(err);


            res.send(comments);
        });
    },
    clearAll(req,res) {
        Comment.remove({}, (err, comment) => {
            if(err)
                res.json(err)

            res.send(comment)
        })
    },
    verifyComment(req,res) {
        Comment.findOneAndUpdate(
            { _id: req.params.id },
            {isVerified: true},
            (err, user) => {
                if (err)
                    res.json(err);
                //redirect user to home page after listing was verified
                res.redirect('https://connectgu.herokuapp.com/Home');
            });
    },
    all(req,res) {
        Comment.find({}, (err, comments) => {
            if (err)
                res.json(err);


            res.send(comments);
        });
    },
    deleteComment(req,res) {
        Comment.remove({ _id: req.params.id }, (err, listing) => {
            if (err)
                return res.json(err);
            res.redirect('https://connectgu.herokuapp.com/Home');
        });
    }
};
