
Accounts.onCreateUser(function(options, user) {

    if (options.profile) {
      user.profile = options.profile;
    };

     user.profile.alive = true;
     user.profile.token = Random.secret(5);
     user.profile.hunters = [];
     user.profile.target = null;
     user.profile.kills = 0;

     //assign a target and a hunter for the new user
     Meteor.setTimeout(function(){
         if (user._id) {
           //todo check if the order of calling is OK
           
             Meteor.call("assignHunter", user._id);
             Meteor.call("assignTarget" , user._id);
             
         };
  }, 1000);
    return user;
});
