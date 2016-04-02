Template.signin.helpers({
   errors: function() {
     return Session.get('loginErrors');
   }
});



Template.signin.events({
    'submit form': function(event){
        event.preventDefault();
        var email = event.target.loginEmail.value;
        var password = event.target.loginPassword.value;
        Meteor.loginWithPassword(email, password , function(error) {
                if (error) {
                    Session.set('loginErrors', error.reason);
                } else {
                    Session.set('loginErrors', "");
                }
        });
    }
});


Accounts.onLogin(function(){
    console.log(Roles.userIsInRole(Meteor.userId(), ['admin']));
    if(Roles.userIsInRole(Meteor.userId(), ['admin'])) {
        Router.go('/admin');
    } else {
        Router.go('/dashboard');
    }
});