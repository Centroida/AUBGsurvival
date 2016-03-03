Router.configure({
    layoutTemplate: 'ApplicationLayout'
});
Router.route('/', function(){
	this.render("navbar", {to: "navbar"});
});
Router.route('/dashboard', function(){
	this.render("navbar", {to: "navbar"});
    this.render("userDashboard", {to: "main"});
});