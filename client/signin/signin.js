Template.signin.helpers({
   errors: function() {
     return Session.get('errors');
   }
});



Template.signin.events({
    'submit form': function(event){
        event.preventDefault();
        var email = event.target.loginEmail.value;
        var password = event.target.loginPassword.value;
        Meteor.loginWithPassword(email, password , function(error) {
                if (error)
                  Session.set('errors', error.reason);
                else
                    Router.go('/dashboard');
        });
    }
});
