Template.userDashboard.onCreated(function() {
    var self = this;

});


Template.userDashboard.helpers({
    target: function () {
        return Session.get("userTarget");

    },
    token: function() {
      return Session.get("personalToken");
    }
});


//Eventszzzzzz

Template.userDashboard.events({
    "click .js-kill-target":function(event){
        var inputId = $(".targetId").val();
            Meteor.call("killTarget", inputId , function(error, response) {
              console.log(response);
              if(error) {
                    alert('Incorrect code!');
              } else {
                Session.set("userTarget" , response);
              }
            });
    }
});
