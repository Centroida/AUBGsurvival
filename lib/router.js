Router.configure({
    layoutTemplate: 'ApplicationLayout'
});
Router.route('/', function(){
	this.render("navbar", {to: "navbar"});
    this.render("home", {to: "main"})
});
Router.route('/dashboard', function(){
  
	this.render("navbar", {to: "navbar"});
    this.render("userDashboard", {to: "main"});
});

Router.route("/register", function(){
    this.render("navbar", {to: "navbar"});
    this.render("register", {to: "main"});
})

Router.route("/admin", function(){
    this.render("navbar", {to: "navbar"});
    this.render("adminDashboard", {to: "main"});  
});

var mustBeSignedIn = function() {
    console.log("action");
    if(!Meteor.userId()) {
        Router.go('/');
        this.next();
    }else{
        this.next();
    }
};

  Router.onBeforeAction(mustBeSignedIn);