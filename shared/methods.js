Meteor.methods({
   userChangeStatus: function(victimId, killerId){
       var user = Meteor.users.findOne({_id:victimId});
       var arrayAssignedTo = user.profile.assignedTo;
       arrayAssignedTo.push(killerId);
       if (user) {
           Meteor.users.update({_id:victimId}, {$set : {"profile.statusAssigned":true, "profile.assignedTo":arrayAssignedTo}});
       }
   } 
});