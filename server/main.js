
Accounts.onCreateUser(function(options, user) {

    if (options.profile) {
      user.profile = options.profile;
    };

     user.profile.status = "alive";
     user.profile.token = Random.secret(5);
     user.profile.hunters = [];
     user.profile.target = null;


     //assign a target and a hunter for the new user
     Meteor.setTimeout(function(){
         if (user._id) {
           //todo check if the order of calling is OK
           Meteor.call("assignTarget" , user._id);
             Meteor.call("assignHunter", user._id);
             
         };
  }, 1000);
    return user;
});
