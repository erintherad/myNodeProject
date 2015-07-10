// SERVER-SIDE JAVASCRIPT

// require express and other modules
var express = require("express");
var app = express();

var bodyParser = require('body-parser')
var _ = require("underscore");

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json 
app.use(bodyParser.json())

// serve js and css files from public folder
app.use(express.static(__dirname + '/public'));

// pre-seeded phrase data
var users = [
	{
		id: 1,
		username: "bob",
		firstname: "Bob",
		lastname: "Jones",
		age: 35
	},
	{
		id: 2,
		username: "jane",
		firstname: "Jane",
		lastname: "Smith",
		age: 25
	}
];

var totalUserCount = 2;

// ROUTES
// root rout (serves index.html)
app.get('/', function(req, res){
	res.sendFile(__dirname + '/public/views/index.html');
});

// phrases index
app.get("/api/users", function(req, res) {
	// send all phrases as JSON response
	res.json(users);
});

// create new phrase
app.post("/api/users", function(req, res){
	// grab param from form data
	var newUser = req.body;
	users.push(newUser);

	// set a unique id never used by a phrase until now
	totalUserCount++;
	newUser.id = totalUserCount;

	// send newUser as JSON response
	res.json(newUser);
});

// update phrase
app.put("/api/users/:id", function(req, res) {
	// set the value of the id
	var targetId = parseInt(req.params.id);
	// find the user in the users array matching the id
	var targetUsers = _.findWhere(users, {id:targetId});
	console.log(targetId);
	// updates to the user
	targetUsers.username = req.body.username;
	targetUsers.firstname = req.body.firstname;
	targetUsers.lastname = req.body.lastname;
	targetUsers.age = req.body.age;
	// send back edited object
	res.json(targetUsers);
	res.send("You have made an update!");
});

app.delete("/api/users/:id", function(req,res) {
	// set the value of the id
	var targetId = parseInt(req.params.id);
	// find item in the users array matching the id
	var targetUsers = _.findWhere(users, {id:targetId});
	// get the index of the found item
	var index = users.indexOf(targetUsers);
	// remove the item at that index, only remove 1 item
	users.splice(index, 1);
	// send back deleted object
	res.json(targetUsers);
	res.send("You have deleted a user!");
});

app.listen(3000);