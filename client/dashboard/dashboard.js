Template.userDashboard.helpers({
    target:function(){
        var userId = Meteor.userId();
        var user = Meteor.users.findOne({_id:userId});
        if (user) {
            var targetId = user.profile.assigned;
            var target = Meteor.users.findOne({_id:targetId});
            
            if (target) {
               var targetInfo = target.profile.name; 
               return targetInfo;
               }
               else{
                   return;
               }
                        
        }
        
        else{
            return;
        }
        
        
        
        
        
    }
});

///////////////////////////////////////
/////////////EVENTS 
//////////////////////////////////////

Template.userDashboard.events({
    "click .js-kill-target":function(event){
        var inputId = $(".targetId").val();
        console.log(inputId);
    }
});