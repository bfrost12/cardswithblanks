app.controller('CreateCtrl', function($scope, $state, Socket){
	$scope.createGame = function(settings) {
		Socket.emit('createGame', settings);
	}
	
	Socket.on('gameCreated', function(data){
		$state.go('play', {id: data.id});
	})
})