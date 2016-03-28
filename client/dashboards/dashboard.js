Template.userDashboard.helpers({
    target:function(){
        var userId = Meteor.userId();
        var user = Meteor.users.findOne({_id:userId});
        if (user) {
            var targetId = user.profile.target;
            var target = Meteor.users.findOne({_id:targetId});

            if (target) {
               var targetInfo = target.profile.lastName + ", " + target.profile.firstName;
               return targetInfo;
               }
               else{
                   return;
               }

        }

        else{
            return;
        }

    },
    
  
});

///////////////////////////////////////
/////////////EVENTS
//////////////////////////////////////

Template.userDashboard.events({
    "click .js-kill-target":function(event){
        var inputId = $(".targetId").val();
        try {
                Meteor.call("killTarget", inputId);  
            } catch (e) {
                console.log(e); 
            }
        // var userId = Meteor.userId();
        // var user = Meteor.users.findOne({_id:userId});
        // var actualVictimId = user.profile.assigned;
        // var actualVictim = Meteor.users.findOne({_id:actualVictimId});
        // if (inputId == actualVictim.profile.token) {
        //     Meteor.call("destroyUser", actualVictimId);
        //     Meteor.call("changeAssigned", actualVictimId, userId);
        //     console.log("You killed the user. How you dare?");
        // } else {
        //     console.log("This is not the right id")
        // }
    }
});


Template.adminDashboard.helpers({ 
  usersStats: function(){
      var users = Meteor.users.find({});
      if(users){
          console.log("hello");
          console.log(users.fetch({}));
          return users;
          
      }
      else{
          return;
      }
  },
  
  currentHunter: function(id){
      var userId = id;
      var user = Meteor.users.findOne({_id:userId});
      if(user){
          var currentHunter = user.profile.lastName + ", " + user.profile.firstName; 
          return currentHunter;
      }
  },
  currentTarget: function(id){
      var userId = id;
      var user = Meteor.users.findOne({_id:userId});
      if(user){
          var currentTarget = user.profile.lastName + ", " + user.profile.firstName;
          return currentTarget;
      }
  } 
}); 

Template.adminDashboard.events({ 
    'click #foo': function(event, template) { 
         
    } 
}); 
