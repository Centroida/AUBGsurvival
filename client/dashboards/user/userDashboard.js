Template.userDashboard.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('userData');
        self.subscribe('users');
    });

});


Template.userDashboard.helpers({
    target: function () {
        return Session.get("userTarget");
    }
});


//Events

Template.userDashboard.events({
    "click .js-kill-target":function(event){
        var inputId = $(".targetId").val();
        try {
            Meteor.call("killTarget", inputId);
        } catch (e) {
            console.log(e);
        }
    }
});


