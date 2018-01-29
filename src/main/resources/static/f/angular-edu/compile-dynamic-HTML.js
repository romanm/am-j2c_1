var app = angular.module('app', []);

app.directive('amdPrintln', function ($compile, $http) {
	return {
		restrict: 'EA',
		scope: true,
		link: function (scope, ele, attrs) {
//			scope.$watch(attrs['amdPrintln'], function(program_init) {
			scope.$watch(attrs['amdPrintln'], function(o_k) {
				console.log(o_k);
				console.log(scope.algoritmed.inits)
				var program_init = scope.algoritmed.inits[o_k];
				if(program_init.isObject()){
					console.log("-----------------11-------");
					angular.forEach(program_init.add_fn, function(v, k){
						program_init[v]=fn_lib[v];
						ele.html(program_init[v]());
					})					
					console.log(program_init);
					console.log(program_init.fn_sum());
				}else
				if((typeof program_init) == 'string'){
					ele.html(program_init);
				}
				$compile(ele.contents())(scope);
				/*
				 * */
			});
		}
	};
});

app.directive('amdRun', function ($compile, $http) {
//	restrict: 'A',
//	replace: true,
	return {
		restrict: 'EA',
		scope: true,
		link: function (scope, ele, attrs) {
			scope.$watch(attrs['amdRun'], function(program_init) {
				//console.log(ele)
				console.log(ele[0].id)
				//console.log(program_init)
				if(program_init.programPath){
					//read a program 1 - to run program
					$http.get(program_init.programPath).then(function(response){
						var amdRun = response.data;
						//console.log(amdRun)
						angular.forEach(amdRun, function(v, k){
//							console.log(v)
//							console.log(k)
							if(k.includes("html_")){
								var k1 = k.replace('html_','');
//								console.log(k1)
								var amdRun_pr_uri = '/f/algoritmed/lib/'+k1+'.html'
								console.log(amdRun_pr_uri)
								//read a program 2 - from library level 1 in run program
								$http.get(amdRun_pr_uri).then(function(response) {
									var pr = response.data;
//									console.log(pr)
									ele.html(pr);
									var pr3 = ele[0].children[1-ele[0].children.length];
//									console.log(v)
									var id2 = ele[0].id+'__'+k1;
//									pr3.setAttribute('id',id2);
									scope.algoritmed.inits[id2]=v;
									pr3.setAttribute('amd-'+k1,'"'+id2+'"');
									$compile(ele.contents())(scope);
								})
							}
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
    		,{programPath:'/f/algoritmed/sample001/helloworld_sum.json'}
    	]
    }
    $scope.text='Hello World!'
    $scope.programs = {}
    $scope.programs.html = '<a ng-click="click(1)" href="#">Click me {{text}} </a>';
//    $scope.html = '<a ng-click="click(1)" href="#">Click me</a>';
  });

var fn_lib = {
	fn_sum:function(){
		return this.a + this.b;
	}
}

Object.prototype.isObject = function(){
	return (''+this).indexOf('Object')>=0;
}
