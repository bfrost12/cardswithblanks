app.config(function($stateProvider){
	$stateProvider.state('join', {
		url: '/game', 
		templateUrl: 'js/game/joingame.html',
		resolve: {
			games: function(Socket) {
				var gamesInProgress = [];
				Socket.emit('getGameList');
				Socket.on('gotGameList', function(data){
					for (var i=0; i<data.games.length; i++){
						if (data.games[i].inProgress === true) {
							gamesInProgress.push(data.games[i]);
						}
					}
				});
				return gamesInProgress;
			}
		},
		controller: 'LobbyCtrl'
	})
	.state('play', {
		url: '/:id',
		templateUrl: 'js/game/game.ui.html',
		resolve: {
			gamedata: function(Socket) {
				var game;
				Socket.emit('getGame');
				Socket.on('gotGame', function(data){
					game = data.game;
					player = data.playerName
				});
				return game;
			}
		},
		controller: function($scope, $state, Socket, gamedata){
			$scope.message = '';
			$scope.messages = [];
			$scope.game = game;

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
		}
	});
});