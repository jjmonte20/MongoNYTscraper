var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

//================================
// Scrapping tools
var axios = require("axios");
var cheerio = require("cheerio");

//================================
// require models
var db = require("./models");
// PORT
var PORT = 3000;

// Initializing express
var app = express();

//=================================
// Middleware

// use to log requests
app.use(logger("dev"));
// parse the data as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// make a public folder static
app.use(express.static("public"));

// connect to the Mongo DB
mongoose.connect("mongodb://localhost/unit18Populater", { useNewUrlParser: true });

//==================================
// Routes

// A GET route for scraping the shoryuken website
app.get("/scrape", function(req, res) {
    // First need to grab the body of the html with axios
    axios.get("http://shoryuken.com").then(function(response) {
    // first load cheerio
    var $ = cheerio.load(response.data);

    // Now let's grab every blog post from the site I'm using
    $("div.blog-post-title").each(function(i, element){

    // Place the result in an object
    var result = {};

    // Adding the text and link
    result.title = $(element).children().text();
    result.link = $(element).find("a").attr("href");

    // After we have an article created, we can then put it in our table
    db.Article.create(result)
        .then(function(dbArticle){
            //let's start by viewing the added result in the console
            console.log(dbArticle);
        })
        .catch(function(err){
            // If an error occurred, log it
            console.log(err);
        });

    //=============================
    });
    //=============================
    //creating a new row item in the database

    res.send("Scrape Complete");
    //===============axios.get });
    });
    //===============app.get });
});

// Starts the server
app.listen(PORT, function() {
    console.log(PORT + " is listening");
})