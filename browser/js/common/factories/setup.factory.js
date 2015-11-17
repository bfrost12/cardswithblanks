app.factory('Setup', function(){
	var _name = '';
	var _game = {};
	var _room = '/';

	return {
		getName: function() {
			return _name;
		},
		getGame: function() {
			return _game;
		},
		getRoom: function() {
			return _room;
		},
		setName: function(name) {
			_name = name; 
		},
		setGame: function(game) {
			_game = game;
		},
		setRoom: function(room) {
			_room = room;
		}
	}
})