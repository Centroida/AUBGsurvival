Meteor.startup(function () {

  //seed data
	if(Meteor.users.find({}).count() == 0) {
        var adminPassEnv = "123123123"//rocess.env.ADMIN_PASSWORDp ;
		var admin = Accounts.createUser({
			email: "admin@aubg.edu",
			password: adminPassEnv,
			profile: { first_name: "Admin" , last_name: "Adminov", isAdmin: true},
			roles: ['admin']
		});
        console.log(admin);
		Roles.addUsersToRoles(admin, ['admin']);

	}
    if(GameState.find({}).count() == 0) {
        GameState.insert({state: false}); //the game will be stopped
    }



});
