var db = require("../models");

// need express
var express = require("express");

// need to route
var router = express.Router();

// load the index page
router.get("/", function(req, res) {
    // need to get to the index page, but first, populate with articles that are false
    db.Article.find({ saved: false })
    .then(function(dbArticle){
    var hbsObject = { unsaved: dbArticle}
    res.render("index", hbsObject)
    });
});

// load the saved page
router.get("/saved", function(req, res) {
    db.Article.find({ saved: true })
    .populate("note")
    .then(function(dbArticle){
    var hbsObject = { saved: dbArticle }
    res.render("saved", hbsObject)
    });
});

// use this to remove all of the articles
router.get("/api/clear", function (req, res) {
    db.Article.remove()
    .then(function(dbArticle) {
        var hbsObject = { unsaved: dbArticle }
        res.render("index", hbsObject)
    });
});

//===========================
// always on the bottom
module.exports = router;