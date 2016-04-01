//todo add pub when ready
Meteor.publish("users", function () {
    return Meteor.users.find({});
});

Meteor.publish("events", function(){
    return Events.find({});
});

Meteor.publish("gamestate" , function() {
  return GameState.findOne({}); //return the only game state
})
