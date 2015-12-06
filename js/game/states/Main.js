//creating a game object
var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');

//adding the games states that the game will have 
game.state.add('Boot', BlackGold.Boot);
game.state.add('Preload', BlackGold.Preload);
game.state.add('MainMenu',BlackGold.MainMenu);
game.state.add('Game',BlackGold.Game);
//starts the Boot game state
game.state.start('Boot');

