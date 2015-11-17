app.config(function($stateProvider){
	$stateProvider.state('join', {
		url: '/join', 
		templateUrl: 'js/lobby/lobby.html',
		resolve: {
			games: function(Socket) {
				var gamesInProgress = [];
				Socket.emit('getGameList');
				Socket.on('gotGameList', function(data){
					console.log(data.games);
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
});