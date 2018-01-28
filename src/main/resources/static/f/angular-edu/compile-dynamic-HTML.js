var app = angular.module('app', []);

app.directive('amdRun', function ($compile, $http) {
//	restrict: 'A',
//	replace: true,
	return {
		restrict: 'EA',
		scope: true,
		link: function (scope, ele, attrs) {
			scope.$watch(attrs['amdRun'], function(program_init) {
				console.log(ele)
				console.log(ele[0].id)
				console.log(program_init)
				if(program_init.programPath){
					$http.get(program_init.programPath).then(function(response) {//read a program
						var amdRun = response.data;
						console.log(amdRun)
						angular.forEach(amdRun, function(v, k){
							console.log(k)
							console.log(v)
							var amdRun_pr_uri = '/f/algoritmed/lib/'+k+'.html'
							console.log(amdRun_pr_uri)
							$http.get(amdRun_pr_uri).then(function(response) {//read a program
								var pr = response.data;
								console.log(pr)
								ele.html(pr);
								$compile(ele.contents())(scope);
							})
						});
					});
				}else
				if(program_init.programName){
					if(!scope.algoritmed.inits[program_init.programName]){
						scope.algoritmed.inits[program_init.programName]
						= program_init;
						console.log(scope.algoritmed)
					}
				}
				if(program_init.html){
					ele.html(program_init.html);
					$compile(ele.contents())(scope);
				}
			});
		}
	};
});

app.controller('Controller', function($scope, $http) {
    $scope.format = 'M/d/yy h:mm:ss a';
    $scope.amdRunObj = function() {
    	console.log(this)
    }
    $scope.click = function(arg) {
//    	alert('Clicked ' + arg);
    	console.log($scope.algoritmed);
    }
    $scope.algoritmed = {
    	programs:{}
        ,htmls:{}
    	,dbs:{}
    	,inits:{}
    	,amdRuns:[
    		{programPath:'/f/algoritmed/sample001/helloworld.json'}
    	]
    }
    $scope.text='Hello World!'
    $scope.programs = {}
    $scope.programs.html = '<a ng-click="click(1)" href="#">Click me {{text}} </a>';
//    $scope.html = '<a ng-click="click(1)" href="#">Click me</a>';
  });
