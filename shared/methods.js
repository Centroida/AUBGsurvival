Meteor.methods({
   userChangeStatus: function(victimId, killerId){
       var user = Meteor.users.findOne({_id:victimId});
       var arrayAssignedTo = user.profile.assignedTo;
       arrayAssignedTo.push(killerId);
       if (user) {
           Meteor.users.update({_id:victimId}, {$set : {"profile.statusAssigned":true, "profile.assignedTo":arrayAssignedTo}});
       }
   },
   
   destroyUser: function(victimId){
       Meteor.users.update({_id:victimId}, {$set: {"profile.status":"killed"}});
   },
   
   //Here happens the actual assignment of the target of the victim to the killer
   changeAssigned: function(victimId, killerId){
       var victim = Meteor.users.findOne({_id:victimId});
       var assignedVictim = victim.profile.assigned;
       Meteor.users.update({_id:killerId}, {$set: {"profile.assigned":assignedVictim}});   
   } 
});