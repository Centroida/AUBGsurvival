
Accounts.onCreateUser(function(options, user) {

    if (options.profile) {
      user.profile = options.profile;
    };

    //Assign attributes
    if(Meteor.users.find().count() == 0) {//check if the user is admin
         // the first user will be an admin by default
    } else {
        user.roles = ['user'];
        user.profile.alive = true;
        user.profile.token = Random.secret(5);
        user.profile.hunters = [];
        user.profile.target = null;
        user.profile.kills = 0;
        user.profile.isAdmin = false;
        Roles.addUsersToRoles(user._id, ['user']);
    }



     //assign a target and a hunter for the new user
     Meteor.setTimeout(function(){
         if (user._id && !user.profile.isAdmin) {
             Meteor.call("assignHunter", user._id);
             Meteor.call("assignTarget" , user._id);

         };
  }, 1000);
    return user;
});
