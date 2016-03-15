Meteor.methods({

   assignTarget: function(hunterId){
       var hunter = Meteor.users.findOne({_id:hunterId});
       if(hunter.profile.target == null) {//step 1 - check if the hunter doesn't have a target already
       var aliveUsers = Meteor.users.find({"profile.alive":true}).count(); // this is the variable which will tell how many users are alive
       console.log("this is the number of the alive users: " + aliveUsers);
         var victim = Meteor.users.findOne({
                        $and:[
  						                {_id: {$ne: hunterId} },
                              {"profile.alive": true},
                             //{"profile.hunters": {$nin: [hunterId]}},//It should not have been targeted by the same hunter
                              {"profile.hunters.1": {$exists: 0}},
                              {"profile.target": {$ne: hunterId}}
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
       var hunter = Meteor.users.findOne({
                      $and:[
						                {_id: {$ne: victimId} },//the user is not the victim
                            {"profile.alive": true}, //the user is alive
                            {"profile.target": null}, // the user does not have a target
                             {"profile.hunters": {$nin: [victimId]}} // the victim is not among the user's hunters
                                      ]
                      });
                      
       if (hunter) {
           victimHunters.push(hunter._id);
           Meteor.users.update({_id:hunter._id}, {$set: {"profile.target":victimId}}); //assign  a target for the hunter
           Meteor.users.update({_id:victimId}, {$set: {"profile.hunters":victimHunters}});//set the array with the new hunter in it
       }
       
       else{
           return;
       }
     
   },
   
   //THE METHOD FOR KILLING A USER AND ASSIGNING HIS TARGETS
   killTarget: function(inputToken){
       console.log("Method killUser have been called");
       var userId = this.userId; // the id of the current user
       var currentUser = Meteor.users.findOne({_id:userId});// we have the current user
       var targetId = currentUser.profile.target; // we obtain the profile target
       var targetUser = Meteor.users.findOne({_id:targetId}); //we find the _id of the target
       
       
       if ((inputToken == targetUser.profile.token) && (currentUser.profile.alive == true)) {// the user's input is correct
       console.log("We are killing this user!!!!!!");
       var kills = currentUser.kills;
       if(!kills){
           kills = 0;
       }
       Meteor.users.update({_id:userId}, {$set: {kills: kills + 1}});
       Meteor.users.update({_id:targetId}, {$set: {"profile.alive":false}}); //assign a value of killed to the user
       
       //Now go the array of his target and delete the entry with the killed user's name    
       var nextTarget = targetUser.profile.target;// we obtain the next target
       var nextTargetUser = Meteor.users.findOne({_id:nextTarget});
       var nextTargetHunters = nextTargetUser.profile.hunters;//the current array of hunters
       var index = nextTargetHunters.indexOf(targetId);
       if (index > -1) {
         nextTargetHunters.splice(index, 1);
         Meteor.users.update({_id:nextTargetUser._id}, {$set:{"profile.hunters":nextTargetHunters}});
       }       
       // End of deleting
      
      //the case with the killer is specific - so we handle it in a different way
      //he has the right on the target's target
       if ((nextTarget != this.userId) && (nextTarget != currentUser.profile.target)) {//check if the next target is not the user himself
           console.log("We are assigning the next target");
           //the killer has the right to obtain the target
         Meteor.users.update({_id:userId}, {$set: {"profile.target":nextTarget}}); //assign a value of killed to the user
       }
       else{//else set his target to null and call the assignTarget method
         Meteor.users.update({_id:userId}, {$set: {"profile.target":null}});
         Meteor.call("assignTarget", userId);
       }
       
       //for all users in the hunters - change their target
       for(position = 0; position < targetUser.profile.hunters.length; position++){
          if (targetUser.profile.hunters[position] != this.userId) {
              var hunterId = targetUser.profile.hunters[position];
              console.log("This is the hunter: " + hunterId );
              Meteor.users.update({_id:hunterId}, {$set: {"profile.target":null}});
              Meteor.call("assignTarget", hunterId);
          }
      }//end for loop
       
       } 
       
       else {//if it is not correct, throw an exception
           throw new Meteor.Error( 400, 'Bad request' );
       }// end of the block for the user's input
       
   },
   
});