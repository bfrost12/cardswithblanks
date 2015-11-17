app.directive('card', function(){
	return {
		restrict: 'E',
		scope: {
			color: '@',
			answers: '@', 
			title: '@', 
			prompt: '@', 
			points: '@'
		},
		link: function(scope, element, attrs) {
			$('.special.cards .image').dimmer({
  				on: 'hover'
			});
			scope.getCardColor = function() {
				return 'js/common/directives/cards/'+attrs.color+'card.html';
			}
		},
		template: '<div ng-include="getCardColor()"></div>'
	}
})