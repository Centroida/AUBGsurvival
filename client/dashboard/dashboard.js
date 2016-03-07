Template.userDashboard.helpers({
    target:function(){
        var userId = Meteor.userId();
        var user = Meteor.users.findOne({_id:userId});
        if (user) {
            var targetId = user.profile.target;
            var target = Meteor.users.findOne({_id:targetId});

            if (target) {
               var targetInfo = target.profile.name;
               return targetInfo;
               }
               else{
                   return;
               }

        }

        else{
            return;
        }

    }
});

///////////////////////////////////////
/////////////EVENTS
//////////////////////////////////////

Template.userDashboard.events({
    "click .js-kill-target":function(event){
        var inputId = $(".targetId").val();
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
