Meteor.startup(function () {
	process.env.MAIL_URL = 'smtp://sandboxc4edb1042fcb41e6bd41e5b1ba6fdcea:8b73b3b9c423049867174dd585b2dda2.mailgun.org:587'
  //seed data
	if(Meteor.users.find({}).count() == 0) {


    var adminPassEnv = process.env.ADMIN_PASSWORD;





		var admin = Accounts.createUser({
			email: "admin@aubg.edu",
			password: adminPassEnv,
			profile: { first_name: "Admin" , last_name: "Adminov", isAdmin: true},
			roles: ['admin']
		});

		Roles.addUsersToRoles(admin, ['admin']);

	}
    if(GameState.find({}).count() == 0) {
        GameState.insert({state: false}); //the game will be stopped
    }



});
