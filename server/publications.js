//todo add pub when ready
Meteor.publish("users", function () {
    return Meteor.users.find({});
});