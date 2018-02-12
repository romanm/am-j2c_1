var uri_read_sql_with_param = '/r/read2_sql_with_param';
app.controller('ControllerDB', function($scope, $http) {
	console.log('-------ControllerDB--------');
	console.log($scope)
	//console.log({ fn_lib:fn_lib , init_am_directive:init_am_directive });
	init_am_directive.tablesJ2C_init = function(response, param){
		$scope[param.scopeObj].docbody = JSON.parse(response.data.list[0].docbody);
		console.log($scope[param.scopeObj])
	};

	new fn_lib.TablesJ2C($scope, $http).j2c_tables.http_get(
	{
		scopeObj:'employee'
		,param:{sql:'docbody_byId',doc_id:826}
	});
	$scope.page={
		head:{
			pageName:'eHealth employee'
			,headClass:'l5 m6 s8'
			,headLink:'/f/angular-edu/1c-db-tables.headLink.html'
		}
	}
	$scope.algoritmed = {programs:{} ,htmls:{} ,dbs:{} ,inits:{} };
});