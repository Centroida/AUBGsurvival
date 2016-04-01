Handlebars.registerHelper('gameRunning', function () {
    var gameState = GameState.findOne({});
    if (gameState) {
       gameState.state ? true : false;
    }
});
