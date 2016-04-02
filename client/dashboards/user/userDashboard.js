Template.userDashboard.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('userData');
        self.subscribe('users');
    });


});


Template.userDashboard.helpers({
    target:function(){
        var user = Meteor.users.findOne({_id:Meteor.userId()});
        if (user) {
            console.log(user);
            var targetId = user.profile.target;

            function take_user(target) {
                var user_for_return = Meteor.users.findOne({_id: target});
                if (user_for_return) {
                    Session.set("target", user_for_return);
                }
                return Session.get("target");
            };

            var target = take_user(targetId);

        }
}});

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



