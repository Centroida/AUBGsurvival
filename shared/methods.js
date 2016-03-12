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
       var aliveUsers = Meteor.users.find({"profile.alive":true}).count(); // this is the variable which will tell how many users are alive
       console.log("this is the number of the alive users: " + aliveUsers);
         var victim = Meteor.users.findOne({
                        $and:[
  						                {_id: {$ne: hunterId} },//this user is not the user himself
                              {"profile.alive": true},//the user is alive
                             //{"profile.hunters": {$nin: [hunterId]}},//It should not have been targeted by the same hunter
                              {"profile.hunters.2": {$exists: 0}},//is not chased by more than 2 hunters by that moment
                              {"profile.target": {$ne: hunterId}}//is not chasing the hunter
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
       
       var firstIterationHunter = Meteor.users.findOne({
                      $and:[
						                {_id: {$ne: victimId} },
                            {"profile.alive": true},
                            {"profile.target": null},
						     //{"profile.hunters.0": {$exists: 0}}
                                      ]
                      });
                      
       if (firstIterationHunter) {
           victimHunters.push(firstIterationHunter._id);
           Meteor.users.update({_id:firstIterationHunter._id}, {$set: {"profile.target":victimId}}); //assign  a target for the hunter
           Meteor.users.update({_id:victimId}, {$set: {"profile.hunters":victimHunters}});//set the array with the new hunter in it
       }
       
       //else{
           
           //  var hunter = Meteor.users.findOne({
           //           $and:[
					//	                {_id: {$ne: victimId} },
                    //        {"profile.alive": true},
                     //       {"profile.target": {$ne: victimId}},
						     //{"profile.hunters.0": {$exists: 0}}
                  //                    ]
                   //   });

       //if (hunter) {
      //     victimHunters.push(hunter._id);
       //    Meteor.users.update({_id:hunter._id}, {$set: {"profile.target":victimId}}); //assign  a target for the hunter
       //    Meteor.users.update({_id:victimId}, {$set: {"profile.hunters":victimHunters}});//set the array with the new hunter in it
   //    } else {
    //       return;
   //    }
           
      // }
     
   },
   
   //THE METHOD FOR KILLING A USER AND ASSIGNING HIS TARGETS
   killTarget: function(inputToken){
       console.log("Method killUser have been called");
       var userId = this.userId; // the id of the current user
       var currentUser = Meteor.users.findOne({_id:userId});// we have the current user
       var targetId = currentUser.profile.target; // we obtain the profile target
       var targetUser = Meteor.users.findOne({_id:targetId}); //we find the _id of the target
       if (inputToken == targetUser.profile.token) {// the user's input is correct
       console.log("We are killing this user!!!!!!");
       Meteor.users.update({_id:targetId}, {$set: {"profile.alive":false}}); //assign a value of killed to the user
       var nextTarget = targetUser.profile.target;// we obtain the next target
       console.log("this is the next target: " + nextTarget);
       // Now the code below should be changed
       //Work with the array of the targeted user
      
      //the case with the killer is specific - so we handle it in a different way
      //he has the right on the target's target
       if (nextTarget != this.userId) {//check if the next target is not the user himself
           console.log("We are assigning the next target");
           //the killer has the right to obtain the target
         Meteor.users.update({_id:userId}, {$set: {"profile.target":nextTarget}}); //assign a value of killed to the user
       }
       else{//else set his target to null and call the assignTarget method
         Meteor.users.update({_id:userId}, {$set: {"profile.target":null}});
         Meteor.call("assignTarget", userId);
       }
       
       for(position = 0; position < targetUser.profile.hunters.length; position++){
          if (targetUser.profile.hunters[position] != this.userId) {
              var hunterId = targetUser.profile.hunters[position];
              console.log("This is the hunter: " + hunterId );
              Meteor.users.update({_id:hunterId}, {$set: {"profile.target":null}});
              Meteor.call("assignTarget", hunterId);
          }
      }//end for loop
       
       } else {//if it is not correct, throw an exception
           throw new Meteor.Error( 400, 'Bad request' );
       }// end of the block for the user's input
       
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