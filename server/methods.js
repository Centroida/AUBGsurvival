Meteor.methods({

    //simple assigning of a hunter and a victim
    chainUsers: function(userId) {
        var victim = Meteor.users.findOne({
            $and:[
                {_id: {$ne: userId} },
                {"profile.alive": true},
                {"profile.target": null},
                {"profile.hunters.0": {$exists: 0}},
                {"roles":{ $nin: ['admin'] }}
            ]
        });
        var user = Meteor.users.findOne({_id: userId});
       if(victim && user.profile.target == null){
           victim.profile.target = userId;
           user.profile.target = victim._id;
           victim.profile.hunters = [userId];
           user.profile.hunters = [victim._id];

           Meteor.users.update({_id: victim._id} , {$set: {"profile": victim.profile}});
           Meteor.users.update({_id: userId}, {$set: {"profile": user.profile}});
       }

    },



   //THE METHOD FOR KILLING A USER AND ASSIGNING HIS TARGETS
   killTarget: function(inputToken){
       console.log("killTarget has been called");
       var userId = this.userId; // the id of the current user
       var currentUser = Meteor.users.findOne({_id:userId});// we have the current user
       var targetId = currentUser.profile.target; // we obtain the profile target
       var targetUser = Meteor.users.findOne({_id:targetId}); //we find the _id of the target


       if ((inputToken == targetUser.profile.token) && (currentUser.profile.alive == true)) {// the user's input is correct
       console.log("A user is being killed");
       var kills = currentUser.profile.kills;
       if(!kills){
           kills = 0;
       }
       Meteor.users.update({_id:userId}, {$set: {"profile.kills": kills + 1}});
       Meteor.users.update({_id:targetId}, {$set: {"profile.alive":false}}); //assign a value of killed to the user
       var nameKiller = currentUser.profile.firstName + " " + currentUser.profile.lastName;
       var nameTarget = targetUser.profile.firstName + " " + targetUser.profile.lastName;
       var stringForInsert = nameKiller + " has just killed " + nameTarget;
       Events.insert({
           "createdOn": new Date(),
           "event":  stringForInsert,
       });

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
       if ((nextTarget != this.userId) && (this.userId != nextTargetUser.profile.target)) {//check if the next target is not the user himself
           console.log("We are assigning the next target");
           //the killer has the right to obtain the target
         Meteor.users.update({_id:userId}, {$set: {"profile.target":nextTarget}}); //assign a value of killed to the user
       }
       else{//else set his target to null and call the assignTarget method
         Meteor.users.update({_id:userId}, {$set: {"profile.target":null}});
         Meteor.call("chainUsers", userId);
       }

      // //for all users in the hunters - change their target
      // for(position = 0; position < targetUser.profile.hunters.length; position++){
      //    if (targetUser.profile.hunters[position] != this.userId) {
      //        var hunterId = targetUser.profile.hunters[position];
      //        console.log("This is the hunter: " + hunterId );
      //        Meteor.users.update({_id:hunterId}, {$set: {"profile.target":null}});
      //        Meteor.call("assignTarget", hunterId);
      //    }
      //}//end for loop

       }

       else {//if it is not correct, throw an exception
           throw new Meteor.Error( 400, 'Bad request' );
       }// end of the block for the user's input

   },


    getTarget: function(targetId){
        var user = Meteor.users.findOne({_id:this.userId});
        if(user) {
            target = Meteor.users.findOne({_id: user.profile.target});
            if(target){
                return target.profile.lastName + " " + target.profile.firstName;
            }
        }


    },

    toggleGameState: function() {
        var gameState = GameState.findOne({});
        gameState.state = !gameState.state;
        console.log(gameState.state);
        GameState.update({_id: gameState._id}, {$set: {state: gameState.state}});
    },

    totalKills: function() {
        var kills = Meteor.users.aggregate([
            {
                $group: {_id : null, totalKills: {$sum: "$profile.kills"} }
            }
        ]);

        return  kills[0].totalKills;

    },

    //delete user
    deleteUser: function(userId) {
        if(Roles.userIsInRole(this.userId, 'admin')) {
            var user = Meteor.users.findOne({_id: userId});
            if(user) {
                var token = user.profile.token;
                Meteor.call('killTarget', token);
            }
        }
    }


});
