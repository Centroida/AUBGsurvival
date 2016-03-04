
Accounts.onCreateUser(function(options, user) { 
    var assignedTo = new Array();
    
    //here the program generates a user who will be assigned to the killer
    var userForAssign = Meteor.users.findOne({$and:[{"profile.status":"alive"},
						                {"profile.statusAssigned":false}
						            ]});
                                    
    var randomToken = Random.secret(5);
    if (options.profile) {
      user.profile = options.profile;
    }
    
    //if there is a user which is ready to be assigned /the magic happens/
     if (userForAssign) {
      user.profile.assigned = userForAssign._id;
      Meteor.call("userChangeStatus", userForAssign._id, user._id);
    }
    else    {
        user.profile.assigned = "pending";
    }
     user.profile.status = "alive";
     user.profile.token = randomToken;
     user.profile.assignedTo = assignedTo;
     user.profile.statusAssigned = false;
     
     //Here the registered user will be assigned to someone with status pending. For example the first user
     
     Meteor.setTimeout(function(){
    Meteor.call("workForPending", user._id);
  }, 1000);
    return user; 
});