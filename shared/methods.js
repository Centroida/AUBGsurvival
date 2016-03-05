Meteor.methods({
  //  userChangeStatus: function(victimId, killerId){
  //      var user = Meteor.users.findOne({_id:victimId});
  //      var arrayAssignedTo = user.profile.assignedTo;
  //      arrayAssignedTo.push(killerId);
  //      if (user) {
  //          Meteor.users.update({_id:victimId}, {$set : {"profile.statusAssigned":true, "profile.assignedTo":arrayAssignedTo}});
  //      }
  //  },
   //
  //  destroyUser: function(victimId){
  //      Meteor.users.update({_id:victimId}, {$set: {"profile.status":"killed"}});
  //  },
   //
  //  //Here happens the actual assignment of the target of the victim to the killer
  //  changeAssigned: function(victimId, killerId){
  //      var victim = Meteor.users.findOne({_id:victimId});
  //      var assignedVictim = victim.profile.assigned;
   //
  //      if (assignedVictim) {
  //          if (assignedVictim != killerId) {
  //              Meteor.users.update({_id:killerId}, {$set: {"profile.assigned":assignedVictim}});
  //          }
  //          else{
  //              Meteor.users.update({_id:killerId}, {$set: {"profile.assigned":"pending"}});
  //          }
  //      } else {
   //
  //      }
   //
  //  },

   assignTarget: function(hunterId){
       var hunter = Meteor.users.findOne({_id:hunterId});
       if(hunter.profile.target == null) {//step 1 - check if the hunter doesn't have a target already
         //the target cannot be the huner, the target has to be alive and
         //it shouldn't have been targeted
         var victim = Meteor.users.findOne({
                        $and:[
  						                {_id: {$ne: hunterId} },
                              {"profile.status": "alive"},
                              {"profile.hunters": {$nin: [hunterId]}}
  						              ]
                        });
          //step 2 - assign the target and the hunter
          if(victim) {
            victimHunters = victim.profile.hunters;
            victimHunters.push(hunterId);
            Meteor.users.update({_id: hunterId} , {$set: {"profile.target": victim._id}});//assign a target for the hunter
            Meteor.users.update({_id: victim._id} , {$set: {"profile.hunters": victimHunters}});//set the array with the new hunter in it
          }
       } else {
         return;
       };
   },

   assignHunter: function(victimId){
       var victim = Meteor.users.findOne({_id:victimId});
       var victimHunters = victim.profile.hunters;
       //the hunter: is not the victim, he/she is alive and is somebody who's not
       //currently targeting the victim
       var hunter = Meteor.users.findOne({
                      $and:[
						                {_id: {$ne: victimId} },
                            {"profile.status": "alive"},
                            {"profile.target": {$ne: victimId}}
						              ]
                      });

       if (hunter) {
           victimHunters.push(hunter._id);
           Meteor.users.update({_id:hunter._id}, {$set: {"profile.target":victimId}}); //assign  a target for the hunter
           Meteor.users.update({_id:victimId}, {$set: {"profile.hunters":victimHunters}});//set the array with the new hunter in it
       } else {
           return;
       }
   }
});

//Idea: Method for if there is someone with status pending give me immediately to them // Done
// The user should not be able to assign himself // Done
// If the user kills the user he is assigned to, then his status for assign should be changed to false and assigned to array
// should become clear
