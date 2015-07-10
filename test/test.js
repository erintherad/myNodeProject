var appjs = require("../app.js");
var expect = require("chai").expect;
var request = require('request')

describe("Testing user API functionality", function() {
	describe("Create", function(){
		it("Should successfully add a new user", function(done){
			var newUser = {username: "erin", firstname: "Erin", lastname: "Mahoney", age: 27}
			var form = {form: newUser}
			request.post('http://localhost:3000/api/users', form, function(err, res, body){
				var user = JSON.parse(body);
				expect(user.id).to.be.a('number');
				done();
			})
		})
	})
});
