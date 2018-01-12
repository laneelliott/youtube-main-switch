/* Book Marker Warm Up (18.3.1)
 * backend
 * ==================== */

// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongojs = require("mongojs");

// Initialize Express
var app = express();

// Initialize PORT
var PORT = process.env.PORT || 8080;

// Configure our app for morgan and body parser
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

// Static file support with public folder
app.use(express.static("public"));

// Mongojs configuration
var databaseUrl = "foundersWeek";
var collections = ["stream"];

// Hook our mongojs config to the db var
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});


// Routes
// ======

// Post a status to the mongoose database
app.post("/update", function(req, res) {

  // Save the request body as an object called status
  var status = req.body;
  console.log(status)

  // If we want the object to have a boolean value of false,
  // we have to do it here, because the ajax post will convert it
  // to a string instead of a boolean


  // Save the status object as an entry into the books collection in mongo
  db.stream.update(status, function(error, updated) {
    // Show any errors
    if (error) {
      console.log(error);
    }
    // Otherwise, send the response to the client (for AJAX success function)
    else {
      res.send(updated);
      console.log(updated)
    }
  });
});

app.get("/status", function(req, res) {
	db.stream.find({ "youtube": true }, function(error, response) {
		if (error) {
			console.log(error);
		} else {
			res.json(response);
		}
	})
})

// Find all books marked as read
app.get("/read", function(req, res) {
  // Go into the mongo collection, and find all docs where "read" is true
  db.books.find({ "read": true }, function(error, found) {
    // Show any errors
    if (error) {
      console.log(error);
    }
    // Otherwise, send the books we found to the browser as a json
    else {
      res.json(found);
    }
  });
});






// Listen on port 3000
app.listen(PORT, function() {
  console.log("App running on port "+ PORT);
});
