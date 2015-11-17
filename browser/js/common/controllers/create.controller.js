app.controller('CreateCtrl', function($scope, $state, Socket, Setup){
	$scope.createGame = function(settings) {
		Socket.emit('createGame', settings);
	}
	
	Socket.on('gameCreated', function(data){
		Setup.setGame(data.game);
		Setup.setName(data.name);
		Setup.setRoom(data.room);
		$state.go('play', {id: data.id});
	})
})