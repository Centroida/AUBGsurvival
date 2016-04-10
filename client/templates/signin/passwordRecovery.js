Template.passwordRecovery.helpers({
  resetPassword : function(t) {
    return Session.get('resetPassword');
  }
});

Template.passwordRecovery.events({

    'submit #recovery-form' : function(e, t) {
      e.preventDefault()
      var email = t.find('#recovery-email').value;

      if (email) {
        Session.set('loading', true);
        Accounts.forgotPassword({email: email}, function(err){
        if (err)
          Session.set('displayMessage', 'Password Reset Error')
        else {
          Session.set('displayMessage', 'Email Sent. Please check your email.')
        }
        Session.set('loading', false);
      });
      }
      return false;
    },

    'submit #new-password' : function(e, t) {
      e.preventDefault();
      var pw = t.find('#new-password-password').value;
      if (password) {
        Session.set('loading', true);
        Accounts.resetPassword(Session.get('resetPassword'), pw, function(err){
          if (err)
            Session.set('displayMessage', 'Password Reset Error &amp; Sorry');
          else {
            Session.set('resetPassword', null);
          }
          Session.set('loading', false);
        });
      }
    return false;
    }
});
