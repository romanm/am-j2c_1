var url_read_sql_with_param = '/r/read2_sql_with_param';

app.controller('ControllerDB', function($scope, $http) {
	console.log('-------ControllerDB--------');
	console.log($scope)
	//console.log({ fn_lib:fn_lib , init_am_directive:init_am_directive });

	$scope.programRun = {
		employee:{
			programFile:{
				TablesJ2C:{param:{sql:'docbody_byId',doc_id:826}}					
				,html_form_type01:{source_path:'/f/eh1/employee1/form.html'}
			}
		}
		,eh_dictionaries:{
			programFile:{
				TablesJ2C:{param:{url:'/f/eh1/dictionaries.json'}}
			}
		}
	};
	run_am_program($scope.programRun.eh_dictionaries, $scope, $http);
	init_am_directive.init_programRuns($scope.programRun);
	init_am_directive.eh_dictionaries = {
		tablesJ2C_init:function(response, param){
			$scope.eh_dictionaries = response.data;
			$scope.eh_dictionaries.keys = {};
			angular.forEach($scope.eh_dictionaries.data, function(v, k){
				$scope.eh_dictionaries.keys[v.name] = k;
			});
			$scope.eh_dictionaries.selectDictionary = function(k){
				var i = this.keys[k.toUpperCase()];
				var v = this.data[i];
				return v;
			}
			console.log($scope.eh_dictionaries);
		}
	};
	init_am_directive.tablesJ2C_init = function(response, param){
		$scope[param.commonArgs.scopeObj].docbody = JSON.parse(response.data.list[0].docbody);
		console.log($scope[param.commonArgs.scopeObj])
	};

	$scope.page={
		head:{
			pageName:'eHealth employee'
			,headClass:'l5 m6 s8'
			,headLink:'/f/angular-edu/1c-db-tables.headLink.html'
		}
	};
	$scope.algoritmed = {programs:{} ,htmls:{} ,dbs:{} ,inits:{} };
});
