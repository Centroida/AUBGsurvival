Template.home.helpers({
  playersKilled: function() {

     Meteor.call('totalKills',function(error,response) {

         return response[0].totalKills;
     })


  }
});