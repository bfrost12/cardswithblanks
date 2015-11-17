app.controller('GameCtrl', function($scope, $state, Socket, Setup){
	$scope.message = '';
	$scope.messages = [];
	$scope.game = Setup.getGame();
	$scope.name = Setup.getName();
	$scope.room = Setup.getRoom();

	//Chat Functions
	$scope.sendMessage = function () {
	    Socket.emit('message', { 
	      message: $scope.message,
	 	  name: $scope.name,
	 	  room: $scope.room
	    });

	    // add the message to our model locally
	    $scope.messages.push({
	      user: $scope.name,
	      text: $scope.message
	    });

	    // clear message box
	    $scope.message = '';
	};

	//Game Listeners
	Socket.on('message', function(message){
		$scope.messages.push(message);
	})

	Socket.on('newPlayer', function(data){
		$scope.messages.push(data.message);
		$scope.game = data.game;
	})
});