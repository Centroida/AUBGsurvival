Router.configure({
    layoutTemplate: 'ApplicationLayout'
});
Router.route('/', function(){
  this.name = 'home';
	this.render("navbar", {to: "navbar"});
  this.render("home", {to: "main"})
});
Router.route('/dashboard', function(){
    this.name = 'user.dashboard';
	  this.render("navbar", {to: "navbar"});
    this.render("userDashboard", {to: "main"});
});

Router.route("/signup", function(){
    this.name = 'user.signup';
    this.render("navbar", {to: "navbar"});
    this.render("register", {to: "main"});
})

Router.route("/signin", function(){
    this.name = 'user.signin';
    this.render("navbar", {to: "navbar"});
    this.render("signin", {to: "main"});
})

Router.route("/admin", function(){
    this.name = 'admin.dashboard';
    this.render("navbar", {to: "navbar"});
    this.render("adminDashboard", {to: "main"});
});

//authentication hooks
var mustBeAdmin = function() {
    if(!Meteor.user() || !Roles.userIsInRole(Meteor.user()._id , ['admin'])) {
        Router.go('/');
    }else{
        this.next();
    }
};

var mustBeSignedIn = function() {
    if(!Meteor.user()|| Meteor.loggingIn()) {
        Router.go('/');
    }else{
        this.next();
    }
};

var mustNotBeSignedIn = function() {
  if(Meteor.user()) {
      Router.go('/');
  } else {
      this.next();
  }
}

Router.onBeforeAction(mustBeSignedIn, {only:  ['user.dashboard']});
Router.onBeforeAction(mustNotBeSignedIn, {only: ['user.signin', 'user.signup']})
Router.onBeforeAction(mustBeAdmin, {only: ['admin.dashboard']});
