var db = require("../models");

// need express
var express = require("express");

// need to route as well
var router = express.Router();

// need to have an api route for all of the scraped articles
router.get("/api/articles?saved=false", function (req, res) {
    // need to get all of the articles that are not saved
    db.Article.find({ saved: false })
    .then(function(dbArticle) {
        // if we find the articles send them to the client
        res.json(dbArticle);
    })
    .catch(function(err) {
        res.json(err);
    });
});

// need to have an api route for all of the scraped articles
router.get("/api/articles?saved=true", function (req, res) {
    // need to get all of the articles that ARE saved
    db.Article.find({ saved: true })
    // before we send this to the then function, we need to populate note for it
    .populate("note")
    .then(function(dbArticle) {
        // if we find the articles send them to the client
        res.json(dbArticle);
    })
    .catch(function(err) {
        res.json(err);
    });
});

// need to have an api route for saving an article
router.put("/api/articles/:id", function (req, res) {
    // saves the individual article
    db.Article.findOneAndUpdate({_id:req.params.id}, {$set:req.body}, function(err) {
        if (err) {
            return res.send(err);
        }
        console.log(req.body);
    });
});

// also need to have one for when the user saves an article

// ========================
// put this on the bottom
module.exports = router;