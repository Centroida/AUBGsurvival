
Accounts.onCreateUser(function(options, user) { 
    
    var userForAssign = Meteor.users.findOne({"profile.status":"alive"});
    var randomToken = Random.secret(5);
    if (options.profile) {
      user.profile = options.profile;
    }
     if (userForAssign) {
      user.profile.assigned = userForAssign._id;
    }
    else    {
        user.profile.assigned = "pending";
    }
     user.profile.status = "alive";
     user.profile.token = randomToken;
    return user; 
});