Template.register.helpers({
   errors: function() {
     return Session.get('errors');
   },
})

Template.register.events({
    'submit form': function(event) {
        event.preventDefault();
    }
});

//hooks
AutoForm.hooks({
  "signupForm": {
    onSubmit: function (doc) {
       Accounts.createUser({
        email: doc.email,
        password: doc.password,
        profile: doc.profile
      }, function(error) {
        if(error) {
          Session.set('errors', error.reason)
        } else {
          Router.go('/dashboard')
        }
      });

     return false;

     }//onSubmit
   }//signUpForm
 });
