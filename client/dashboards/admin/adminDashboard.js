/**
 * Created by test most on 4/2/2016.
 */
Template.adminDashboard.helpers({
    usersStats: function(){
        var users = Meteor.users.find({"roles":{ $nin: ['admin'] }});
        if(users){

            return users;

        }
        else{
            return;
        }
    },

    currentHunter: function(id){
        var userId = id;
        var user = Meteor.users.findOne({_id:userId});
        if(user){
            var currentHunter = user.profile.lastName + ", " + user.profile.firstName;
            return currentHunter;
        }
    },
    currentTarget: function(id){
        var userId = id;
        var user = Meteor.users.findOne({_id:userId});
        if(user){
            var currentTarget = user.profile.lastName + ", " + user.profile.firstName;
            return currentTarget;
        }
    }
});

Template.adminDashboard.events({
    'click #foo': function(event, template) {

    }
});