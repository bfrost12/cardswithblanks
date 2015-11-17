var io;
var gameSocket;
var Player = require('./player');
var _ = require('lodash');

var allGames = [];
var allCards = [
 {
        title: 'Pay Day',
        prompt: 'How I feel on pay day:',
        color: 'purple',
        answers: [],
        points: 5
    },
    {
        title: 'Test Card',
        prompt: 'This is a test card. Fill in the ____ with any word you want.',
        color: 'blue',
        answers: [],
        points: 5
    },
    {
        title: 'Cats',
        prompt: 'This is the best cat meme ever',
        color: 'purple',
        answers: [], 
        points: 10
    },
    {
        title: 'The World Go Round',
        prompt: '_______ makes the world go \'round',
        color: 'blue',
        answers: [],
        points: 20
    },
    {
        title: 'Dog',
        prompt: 'If I had a dog, I\'d totally name him ______.',
        color: 'blue',
        answers: [], 
        points: 15
    },]

/* *************************
   *                       *
   *      GAME LOGIC       *
   *                       *
   ************************* */

//Generates a unique game ID for each game
var generateGameID = function(){
	function S4() {
	return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
	}

	var guid = (S4() + S4() + "-" + S4()).toLowerCase();
	return guid; }

var Game = function(settings){
	this.leader = settings.leader || randomName();
	this.maxPlayers = settings.maxPlayers;
	this.numRounds = settings.numRounds;
	this.players = [];
	this.deck = [];
	this.id = generateGameID();
	this.inProgress = false;
	this.round = 0;
	this.name = settings.name || "Game ID: "+this.id;

	this.addCards = function(numRounds){
	var cards = allCards.slice(0);
	var deck = [];
	for (var i=0; i<numRounds; i++){
		var cardToAdd = cards[Math.floor(Math.random() * cards.length)];

		if (cards.length === 0) {
			console.log("Ran out of cards to add!");
			return this.deck = deck;
		}

		if (deck.indexOf(cardToAdd) === -1) {
			cards.splice(cards.indexOf(cardToAdd), 1);
			deck.push(cardToAdd);
		}
	}
		return this.deck = deck;
	}
}

function createPlayer(name){
	return Player.newPlayer(name);
}

function createGame(settings) { 
	//creates a new game & saves to database
	var game = new Game(settings);
	var leader = createPlayer(game.leader)
	
	game.players.push(leader);
	game.addCards(settings.numRounds); 
	game.inProgress = true;

	allGames.push(game);

	//and creates a socket.io room for that game, sends it back to the client
	var thisGameId = game.id;
	var theLeader = game.leader;
	this.emit('gameCreated', {
		game: game, 
		room: thisGameId, 
		name: theLeader
	});
	
	//join the room you created and wait for players
	this.join(thisGameId);
}

function randomName(){
	var name = 'Guest '+Math.floor(Math.random()*1000);
	return name;
}

function joinGame(data) {
	if (!data.player){
		data.player = randomName();
	}

	var theGame = _.find(allGames, {id: data.room});
	if (!theGame) {
		this.emit('response', {message: 'game not found.'})
		return;
	}
	console.log(theGame.players.length);
	console.log(theGame.maxPlayers);
	if (theGame.players.length == theGame.maxPlayers) {
		this.emit('response', {message: 'The game has reached capacity. Joining as a spectator.'})
	} 
	else {
		var newPlayer = Player.newPlayer(data.player)
		if(theGame.players.indexOf(newPlayer) === -1) { //add the player to the game if they're not already part of it
			theGame.players.push(newPlayer);
		}
	}

	this.join(data.room);

	this.emit('joined', { //Join the game
		room: data.room,
		game: theGame,
		name: data.player
	})

	this.broadcast.to(data.room).emit('newPlayer', {
		message: {
			user: 'GameBot',
			text: data.player+' has joined the game!'
		},
			game: theGame
	});
}	


function getGames(){
	this.emit('gotGameList', {games: allGames});
}
function getGame(data){
	var theGame = _.find(allGames, {id: data.id});
	this.emit('gotGame', {message: 'You joined the game '+theGame.name, game: theGame});
}

function sendMessage(data){
	this.broadcast.to(data.room).emit('message', {
	       user: data.name,
	       text: data.message
	});
}


function init(socket) {
	console.log('Server connected to IO!');
	socket.emit('connected', {
        message: 'The server is connected. The client is listening.'
    });

	//Host Events
	socket.on('createGame', createGame);
	socket.on('getGameList', getGames);
	socket.on('getGame', getGame)
	/*socket.on('startGame', startGame); // only the leader can start the game (controlled on the front end).
	
	//Game Events
	socket.on('displayAnswers', displayAnswers);*/

	//Player Events
	socket.on('joinGame', joinGame);
	/*socket.on('addAnswer', addAnswer);
	socket.on('addVote', addVote);*/

	//Chat Events
	socket.on('message', sendMessage);
}

module.exports = {
	init: init
}