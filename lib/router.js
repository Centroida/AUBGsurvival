Router.configure({
    layoutTemplate: 'ApplicationLayout'
});
Router.route('/', function(){
	this.render("navbar", {to: "navbar"});
});