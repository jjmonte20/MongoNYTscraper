var db = require("../models");

// need express
var express = require("express");

// var mongoose = require("mongoose");

// need to route as well
var router = express.Router();

// // need to have an api route for all of the scraped articles
// router.get("/api/articles?saved=false", function (req, res) {
//     // need to get all of the articles that are not saved
//     db.Article.find({ saved: false })
//     .then(function(dbArticle) {
//         // if we find the articles send them to the client
//         res.json(dbArticle);
//     })
//     .catch(function(err) {
//         res.json(err);
//     });
// });

// need to have an api route for all of the notes associated with an article
router.get("/api/articlenote/:id", function (req, res) {
    // need to get the specific article
    db.Article.findOne({ _id: req.params.id })
    // before we send this to the then function, we need to populate note for it
    .populate("note")
    .then(function(dbArticle) {
        // if we find the article send them to the client
        res.json(dbArticle);
    })
    .catch(function(err) {
        res.json(err);
    });
});

// need to have an api route for saving an article
router.put("/api/articles/:id", function (req, res) {
    // saves the individual article
    db.Article.findOneAndUpdate({_id:req.params.id}, { $set:req.body }, function(err) {
        if (err) {
            return res.send(err);
        }
        console.log(req.body);
    });
});

// use this to remove one of the articles
router.get("/api/removearticle/:id", function (req, res) {
    db.Article.remove({ _id: req.params.id })
    .then(function(dbArticle) {
        res.json(dbArticle)
    });
});

// use this to remove one of the articles
router.get("/api/removenote/:id", function (req, res) {
    db.Note.remove({ _id: req.params.id })
    .then(function(dbNote) {
        res.json(dbNote);
    });
});

// use this to clear saved articles
router.get("/api/clearsaved", function (req, res) {
    db.Article.remove()
    .then(function(dbArticle) {
        var hbsObject = { saved: dbArticle }
        res.render("saved", hbsObject)
    });
});

// also need to have one for when the user saves an article

// ========================
// put this on the bottom
module.exports = router;