app.controller('LobbyCtrl', function($scope, $state, Socket, games){
	$scope.games = games

	$scope.joinGame = function(playerName, gameID) {
		Socket.emit('joinGame', {
			room: gameID,
			player: playerName
		})
	}
	Socket.on('joined', function(data){
		$state.go('play', {id: data.room})
	});
});