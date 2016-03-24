Template.home.helpers({
    events: function(){
        return Events.find({}, {sort: {createdOn: -1}, limit: 5});
    }
})