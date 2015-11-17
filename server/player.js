'use strict'

var generatePlayerID = function(){
	function S4() {
		return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
	}

	var guid = (S4() + "-" + S4()).toLowerCase();
	return guid;
}

var Player = function(name){
	this.name = name;
	this.score = 0;
	this.id = generatePlayerID();
}

var newPlayer = function(name){
	return new Player(name);
}

module.exports = {
	newPlayer: newPlayer
}