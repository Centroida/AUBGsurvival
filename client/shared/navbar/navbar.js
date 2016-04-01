Template.navbar.events({
    "click .js-logout": function(event){
        if (Meteor.userId()) {
            Meteor.logout();
        }
    } 
})