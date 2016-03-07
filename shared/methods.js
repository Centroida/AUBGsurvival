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
                              {"profile.alive": true},
                              {"profile.hunters": {$nin: [hunterId]}},
                              {"profile.hunters.2": {$exists: 0}}
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
                            {"profile.alive": true},
                            {"profile.target": {$ne: victimId}},
						     {"profile.hunters.2": {$exists: 0}}         ]
                      });

       if (hunter) {
           victimHunters.push(hunter._id);
           Meteor.users.update({_id:hunter._id}, {$set: {"profile.target":victimId}}); //assign  a target for the hunter
           Meteor.users.update({_id:victimId}, {$set: {"profile.hunters":victimHunters}});//set the array with the new hunter in it
       } else {
           return;
       }
   },
   
   //THE METHOD FOR KILLING A USER AND ASSIGNING HIS TARGETS
   killTarget: function(inputToken){
       var userId = this.userId;
       var currentUser = Meteor.users.findOne({_id:userId});
       var targetId = currentUser.profile.target;
       var targetUser = Meteor.users.findOne({_id:targetId});
       console.log(targetId);
       console.log(targetUser);
       if (inputToken == targetUser.profile.token) {
       Meteor.users.update({_id:targetId}, {$set: {"profile.alive":false}}); //assign a value of killed to the user
       var nextTarget = targetUser.profile.target;
       
       if (nextTarget != this.userId) {
         Meteor.users.update({_id:userId}, {$set: {"profile.target":nextTarget}}); //assign a value of killed to the user
       }
       else{
         Meteor.users.update({_id:userId}, {$set: {"profile.target":null}});
         Meteor.call("assignTarget", userId);
       }
       
       } else {
           throw new Meteor.Error( 400, 'Bad request' );
       }
       
   },
   
});

   
   

//Idea: Method for if there is someone with status pending give me immediately to them // Done
// The user should not be able to assign himself // Done

//BackEnd tasks:
//Assigning if the killer is also a target of his target is forbidden //Done
//It is allowed if the alive users are not more than 20
//The user could not target himself  ---- killTarget // Done
//Simulate a game with seven players
//Go through the assignHunter and assign target methods and look for possiblee optimizations
//delete from arrays
//Counter for kills + increment
//when someone is dead he should not be able to kill
//Email Validation