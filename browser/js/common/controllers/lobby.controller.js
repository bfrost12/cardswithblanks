app.controller('LobbyCtrl', function($scope, $state, Socket, Setup, games){
	$scope.games = games

	$scope.joinGame = function(playerName, gameID) {
		Socket.emit('joinGame', {
			room: gameID,
			player: playerName
		})
	}
	Socket.on('joined', function(data){
		Setup.setName(data.name);
		Setup.setGame(data.game);
		Setup.setRoom(data.room);
		$state.go('play', {id: data.room})
	});

	Socket.on('response', function(data){
		console.log(data.message);
	});
});