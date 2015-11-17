app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('about', {
        url: '/about',
        resolve: {
        	joinRoom: function(Socket){
        		Socket.emit('joinRoom', {
        			room: 'about'
        		});
        	}
        },
        templateUrl: 'js/about/about.html',
        controller: 'GameCtrl'
    });
});

/*app.controller('AboutController', function ($scope, joinRoom, Socket) {
	
	Socket.on('joinedRoom', function(data){
		console.log(data);
		Socket.emit('message');
	});
	Socket.on('test', function(data){
			console.log(data)
		});
	
});*/