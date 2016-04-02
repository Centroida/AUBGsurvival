Meteor.startup(function () {

  //seed data
	if(Meteor.users.find().count() == 0) {
		var admin = Accounts.createUser({
			email: "admin@aubg.edu",
			password: "123123123",
			profile: { first_name: "Admin" , last_name: "Adminov", isAdmin: true},
			roles: ['admin']
		});
        console.log(admin);
		Roles.addUsersToRoles(admin, ['admin']);

	}

	GameState.insert({state: false}); //the game will be stopped


});
