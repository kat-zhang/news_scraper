// Dependencies
var express = require("express");
var mongojs = require("mongojs");
// Require axios and cheerio. This makes the scraping possible
var axios = require("axios");
var cheerio = require("cheerio");

// Initialize Express
var app = express();

// Database configuration
var databaseUrl = "scrapeArticles";
var collections = ["articles"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});

// Main route )
app.get("/", function(req, res) {
  res.send("Welcome to News Scraper");
});

app.get("/all", function(req, res) {
  // Find all results from the scrapedData collection in the db
  db.articles.find({}, function(error, found) {
    // Throw any errors to the console
    if (error) {
      console.log(error);
    }
    // If there are no errors, send the data to the browser as json
    else {
      res.json(found);
    }
  });
});


app.get("/scrape", function(req, res) {
  // Make a request via axios for the news section of `ycombinator`
  axios.get("https://www.nytimes.com/section/world").then(function(response) {
    // Load the html body from axios into cheerio
    var $ = cheerio.load(response.data);
    // For each element with a "title" class
    $("h2.headline").each(function(i, element) {
      // Save the text and href of each link enclosed in the current element
      var headline = $(element).text();
      // If this found element had both a title and a link
      if (headline) {
        // Insert the data in the scrapedData db
        db.articles.insert({
          headline: headline
        },
        function(err, inserted) {
          if (err) {
            // Log the error if one is encountered during the query
            console.log(err);
          }
          else {
            // Otherwise, log the inserted data
            console.log(inserted);
          }
        });
      }
    });
  });

  // Send a "Scrape Complete" message to the browser
  res.send("Scraping articles...");
});


// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});
