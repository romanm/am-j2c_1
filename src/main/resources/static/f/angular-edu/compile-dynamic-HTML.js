var app = angular.module('app', []);

app.directive('amdRun', function ($compile) {
//	restrict: 'A',
//	replace: true,
	return {
		restrict: 'EA',
		scope: true,
		link: function (scope, ele, attrs) {
			scope.$watch(attrs['amdRun'], function(program_init) {
				console.log(scope)
				console.log(ele)
				console.log(ele.html)
				if(!scope.algoritmed.inits[program_init.programName]){
					scope.algoritmed.inits[program_init.programName]
						= program_init;
					console.log(scope.algoritmed)
				}
				ele.html(program_init.html);
				$compile(ele.contents())(scope);
			});
		}
	};
});

app.controller('Controller', ['$scope', function($scope) {
    $scope.format = 'M/d/yy h:mm:ss a';
    $scope.click = function(arg) {
    	alert('Clicked ' + arg);
    }
    $scope.algoritmed = {
    	programs:{}
        ,htmls:{}
    	,dbs:{}
    	,inits:{}
    }
    $scope.text='Hello World!'
    $scope.programs = {}
    $scope.programs.html = '<a ng-click="click(1)" href="#">Click me {{text}} </a>';
//    $scope.html = '<a ng-click="click(1)" href="#">Click me</a>';
  }]);
