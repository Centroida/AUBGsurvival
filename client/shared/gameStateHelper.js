Handlebars.registerHelper('gameRunning', function () {
    var gameState = GameState.findOne({});
    if (gameState) {
        console.log(gameState.state);
       gameState.state ? true : false;
    }
});
