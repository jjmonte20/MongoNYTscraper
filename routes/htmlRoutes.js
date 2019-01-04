var db = require("../models");

// need express
var express = require("express");

// need to route
var router = express.Router();

// load the index page
router.get("/", function(req, res) {
    res.render("index", {
        title: "ShoryuScraper",
        msg: "Welcome"
    });
});

// load the saved page
router.get("/saved", function(req, res) {
    res.render("saved", {
        title: "Saved Articles",
        msg: "Here are your saved articles"
    });
});

//===========================
// always on the bottom
module.exports = router;