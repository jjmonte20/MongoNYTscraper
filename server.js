var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");

//================================
// Scrapping tools
var axios = require("axios");
var cheerio = require("cheerio");

//================================
// require models
var db = require("./models");
// PORT
var PORT = process.env.PORT || 3000;

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

// handlebars
app.engine(
    "handlebars",
    exphbs({
        extname: "handlebars",
        defaultLayout: "main"
    })
);
app.set("view engine", "handlebars");

// connect to the Mongo DB
mongoose.connect("mongodb://localhost/shoryuPopulater", { useNewUrlParser: true });

//==================================
// Routes
var htmlRoutes = require("./routes/htmlRoutes");
var apiRoutes = require("./routes/apiRoutes");

app.use(htmlRoutes);
app.use(apiRoutes);

// A GET route for scraping the shoryuken website
app.get("/api/scrape", function(req, res) {
    // First need to grab the body of the html with axios
    axios.get("http://shoryuken.com").then(function(response) {
    // first load cheerio
    var $ = cheerio.load(response.data);

    // Now let's grab every blog post from the site I'm using
    $("div.blog-post-title").each(function(i, element){

    // Place the result in an object
    var result = {};

    // Adding the text and link
    result.title = $(this).children().text();
    result.link = $(this).find("a").attr("href");
    result.saved = false;

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

    res.render("index");
    //===============axios.get });
    });
    //===============app.get });
});

// =====================================
// Here are the articles
app.get("/articles", function (req, res) {
    // Grab every document in the articles collection
    db.Article.find({})
        .then(function(dbArticle) {
            // If we find the articles, send it to the client side
            res.json(dbArticle);
        })
        .catch(function(err) {
            // If an error occurs, send it to the client
            res.json(err);
        });
});

// need an api route for adding a note to an article
app.post("/api/addnote/:id", function (req, res) {
    console.log(req.body);
    // Creates a new note and passes the req.body to the entry
    db.Note.create(req.body)
        .then(function(dbNote) {
            console.log(dbNote);
            // If a note is created successfully, find one and update article to include the note
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { $push:{ note: dbNote._id }}, { new: true });
        })
        .then(function(dbArticle) {
            console.log(dbArticle)
            // If we are able to update the article, send it back to the user
            res.json(dbArticle);
        })
        .catch(function(err) {
            // If an error occurs, send it to the client
            res.json(err);
        });
});

// Starts the server
app.listen(PORT, function() {
    console.log(PORT + " is listening");
})