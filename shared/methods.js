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
       
       if (assignedVictim) {
           if (assignedVictim != killerId) {
               Meteor.users.update({_id:killerId}, {$set: {"profile.assigned":assignedVictim}});
           }
           else{
               Meteor.users.update({_id:killerId}, {$set: {"profile.assigned":"pending"}});
           }
       } else {
           
       }
          
   },
   
   //Give some work for a free user
   workForPending: function(victimId){
       var victim = Meteor.users.findOne({_id:victimId});
       console.log(victim.profile.name);
       var arrayAssignedTo = victim.profile.assignedTo;
       var freeUser = Meteor.users.findOne({$and:[{"profile.assigned":"pending"},
						                {_id: {$ne: victimId} }
						            ]});
       var freeUserId = freeUser._id;
       console.log(freeUserId);
       if (freeUser) {
           arrayAssignedTo.push(freeUserId);
           Meteor.users.update({_id:freeUserId}, {$set: {"profile.assigned":victimId}});
           Meteor.users.update({_id:victimId}, {$set: {"profile.statusAssigned":true, "profile.assignedTo":arrayAssignedTo}});
       } else {
           return;
       }
   } 
});

//Idea: Method for if there is someone with status pending give me immediately to them // Done
// The user should not be able to assign himself // Done
// If the user kills the user he is assigned to then his status for assign should be changed to false and assigned to array 
// should become clear