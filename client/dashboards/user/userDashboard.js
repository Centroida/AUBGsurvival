Template.userDashboard.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('userData');
        self.subscribe('users');
    });

    var user = Meteor.users.findOne({_id:Meteor.userId()});
    if(user) {
        var targetId = user.profile.target;
        Meteor.users.findOne({_id:targetId});
    }

});


Template.userDashboard.helpers({
    target:function(){

            var target = Meteor.users.findOne({_id:targetId});
                console.log(target);
            if (target) {
                console.log(target);
               var targetInfo = target.profile.lastName + " " + target.profile.firstName;
               return targetInfo;
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



