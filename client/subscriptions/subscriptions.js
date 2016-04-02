Tracker.autorun(function () {
    Meteor.subscribe("users");
    Meteor.subscribe("events");
    Meteor.subscribe("gamestate");
});




