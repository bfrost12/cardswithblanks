app.config(function($stateProvider){
	$stateProvider.state('play', {
		url: '/:id',
		templateUrl: 'js/game/game.ui.html',
		controller: 'GameCtrl'
	});
});