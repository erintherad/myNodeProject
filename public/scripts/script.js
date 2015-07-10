// CLIENT-SIDE JAVASCRIPT

$(function(){

	// userController holds all our user functionality
	var userController = {
		// compile phrase template
		template: _.template($('#user-template').html()),

		all: function() {
			$.get('api/users', function(data){
				var allUsers = data;
				// iterate through allUsers
				_.each(allUsers, function(user){
					// pass each user object through template and append to view
					var $userHtml = $(userController.template(user));
					$('#user-list').append($phraseHtml);
				});
				// add event-handlers to users for updating/deleting
				usersController.addEventHandlers();
			});
		},

		create: function(newUsername, newFirstname, newLastname, newAge) {
			var userData = {username: newUsername, firstname: newFirstname, lastname: newLastname, age: newAge};
			// send POST request to server to create new phrase
			$.post('api/users', userData, function(data){
				// pass user object through template and append to view
				var $userHtml = $(userController.template(data));
				$('#user-list').append($userHtml);
			});
		},

		update: function(userId, updatedUsername, updatedFirstname, updatedLastname, updatedAge) {
			$.ajax({
				type: 'PUT',
				url: '/api/users/' + userId,
				data: {
					username: updatedUsername,
					firstname: updatedFirstname,
					lastname: updatedLastname,
					age: updatedAge
				},
				success: function(data) {
					// pass user objet through template and append to view
					var $userHtml = $(userController.template(data));
					$('#user-' + userId).replaceWith($userHtml);
				},
				error: function(jqXHR, textStatus, errorThrown) {
					console.log(textStatus);
				}
			});
		},

		delete: function(userId) {
			// send DELETE request to server to delete phrase
			$.ajax({
				type: 'DELETE',
				url: '/api/users/' + userId,
				sucess: function(data) {
					// remove deleted user li from the view
					$('#user-' + userId).remove();
				}
			});
		},

		// add event-handlers to users for updating/deleting
		addEventHandlers: function() {
			$('#user-list')
			// for update: submit event on '.update-user' form
			.on('submit', '.update-user', function(event){
				event.preventDefault();
				var userId = $(this).closest('.user').attr('data-id');
				var updatedUsername = $(this).find('.updated-username').val();
				var updatedFirstname = $(this).find('.updated-firstname').val();
				var updatedLastname = $(this).find('.updated-lastname').val();
				var updatedAge = $(this).find('.updated-age').val();
				userController.update(userId, updatedUsername, updatedFirstname, updatedLastname, updatedAge);
			})
			// for delete: click event on '.delete-user' button
			.on('click', '.delete-user', function(event){
				event.preventDefault();
				var userId = $(this).closest('.user').attr('data-id');
				userController.delete(userId);
			});
		},

		setupView: function() {
			// append existing users to view
			userController.all();
			// add event-handler to new-user form
			$('#new-user').on('submit', function(event){
				event.preventDefault();
				var newUsername = $('#new-username').val();
				var newFirstname = $('#new-firstname').val();
				var newLastname = $('#new-lastname').val();
				var newAge = $('#new-age').val();
				userController.create(newUsername, newFirstname, newLastname, newAge);

				// reset the form
				$(this)[0].reset();
				$('#new-user').focus();
			});
		}
	};

	userController.setupView();
});