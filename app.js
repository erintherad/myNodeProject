var express = require("express");
var app = express();

var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json 
app.use(bodyParser.json())

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

app.get("/users/", function(req, res) {
	res.json(users);
});

app.post("/users", function(req, res){
	var newUser = req.body;
	users.push(newUser);
	res.json(newUser);
});

app.put("/users/:id", function(req, res) {
	var targetId = parseInt(req.params.id);
	var targetUsers = _.findWhere(users, {id:targetId});

	targetUsers.username = req.body.username;
	targetUsers.firstname = req.body.firstname;
	targetUsers.lastname = req.body.lastname;
	targetUsers.age = req.body.age;

	res.json(targetPhrase);
	res.send("You have made an update!");
});

app.delete("/users/:id", function(req,res) {
	var targetId = parseInt(req.params.id);
	var targetUsers = _.findWhere(users, {id:targetId});
	var index = users.indexOf(targetUsers);

	phrases.slice(index, 1);
	res.json(targetUsers);
	res.send("You have deleted a user!");
});

app.listen(3000);