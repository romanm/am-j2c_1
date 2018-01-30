var app = angular.module('app', []);

app.directive('amdForm', function ($compile, $http) {
	return {
		restrict: 'EA',
		scope: true,
		link: function (scope, ele, attrs) {
			scope.$watch(attrs['amdForm'], function(obj_key) {
				console.log(obj_key);
				console.log(scope.algoritmed.inits)
			});
	}	};
});

app.directive('amdPrintln', function ($compile, $http) {
	return {
		restrict: 'EA',
		scope: true,
		link: function (scope, ele, attrs) {
			scope.$watch(attrs['amdPrintln'], function(obj_key) {
				var program_init = scope.algoritmed.inits[obj_key];
				if(program_init.isObject()){
					angular.forEach(program_init, function(v, k){
//						if(key_words[k]){}else
						if(k.indexOf('text_')==0){
							ele.html(v);
						}
					})
					angular.forEach(program_init.add_fn, function(v, k){
						program_init[v]=fn_lib[v];
						ele.html(program_init[v]());
					})					
				}else
				if((typeof program_init) == 'string'){
					ele.html(program_init);
				}
				$compile(ele.contents())(scope);
			});
	}	};
});

app.directive('amdRun', function ($compile, $http) {
	return {
		restrict: 'EA',
		scope: true,
		link: function (scope, ele, attrs) {
			scope.$watch(attrs['amdRun'], function(program_init) {
				if(program_init.programPath){
					//read a program 1 - to run program
					$http.get(program_init.programPath).then(function(response){
						var amdRun = response.data;
						angular.forEach(amdRun, function(v, k){
							if(k.includes("html_")){
								var k1 = k.replace('html_','');
								var amdRun_pr_uri = v.source_path;
								if(!v.source_path)
									amdRun_pr_uri = '/f/algoritmed/lib/'+k1+'.html'
								//read a program 2 - from library level 1 in run program
								$http.get(amdRun_pr_uri).then(function(response) {
									var pr = response.data;
									ele.html(pr);
									var id2 = ele[0].id+'__'+k1;
									scope.algoritmed.inits[id2]=v;
									if(init_amd_directive[k1])
										init_amd_directive[k1](scope, ele, id2);
									var pr3 = ele[0].children[1-ele[0].children.length];
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
    		,{programPath:'/f/algoritmed/sample001/helloworld_sum_dialog.json'}
    	]
    }
    $scope.text='Hello World!';
    $scope.programs = {};
    $scope.programs.html = '<a ng-click="click(1)" href="#">Click me {{text}} </a>';
  });

var key_words = {
	add_fn:{}
	,source_path:{}
}
var init_amd_directive = {
	add_fn:function(scope, id2){
		var program_init = scope.algoritmed.inits[id2];
		angular.forEach(program_init.add_fn, function(v, k){
			program_init[v]=fn_lib[v];
		})					
	}
	,form:function(scope, ele, id2){
		var pr3 = ele[0].children[1-ele[0].children.length];
		var modelObj = "algoritmed.inits['"+id2+"']";
		angular.forEach(pr3.children, function(v, k){
			if(v.getAttribute('am-bind')){
				v.setAttribute('ng-bind',modelObj+"."+v.getAttribute('am-bind'));
			}
			if(v.getAttribute('am-model')){
				v.setAttribute('ng-model',modelObj+"['"+v.getAttribute('am-model')+"']");
			}
		});
		this.add_fn(scope, id2);
	}
}
var fn_lib = {
	fn_sum:function(){
		return this.a*1 + this.b*1;
	}
}

Object.prototype.isObject = function(){
	return (''+this).indexOf('Object')>=0;
}
