app.config(function($stateProvider){
    $stateProvider.state('create', {
        url: '/creategame',
        templateUrl: 'js/create-game/creategame.html',
        controller: 'CreateCtrl'
    })
});