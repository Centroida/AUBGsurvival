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
            Meteor.call("killTarget", inputId , function(error, response) {
              console.log(response);
              if(error) {
                    console.log(error)
              } else {
                Session.set("userTarget" , response);
              }
            });
    }
});
