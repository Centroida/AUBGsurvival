Template.home.helpers({
      rankings:function(){
        var users = Meteor.users.find({}, {sort:{"profile.kills": -1}});
        if(users){
            return users;
        }
    }
})