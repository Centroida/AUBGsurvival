Template.recentEvents.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('events');
    });

});



Template.recentEvents.helpers({
    events: function(){
        return Events.find({}, {sort: {createdOn: -1}, limit: 5});
    }
});