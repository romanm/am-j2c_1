app.controller('ControllerDB', function($scope, $http) {
	console.log('-------ControllerDB--------');
	console.log({
		fn_lib:fn_lib
		, init_am_directive:init_am_directive
	});
	$scope.algoritmed = { programs:{} ,htmls:{} ,dbs:{} ,inits:{} };
	var tables1C = new Tables1C($scope, $http);
	tables1C.j2c_tables.http_get({sql:'tables'});
	tables1C.j2c_tables.http_get({sql:'create_tables'});
	/*
	var tables1C = new tables1C($scope, $http);
	tables1C.program_folder.http_get();
	 * */
});

function Tables1C(scope, $http){
	console.log('-------Tables1C--------');
	this.scope = scope;
	this.j2c_tables = {
			http_get : function(param){
				console.log(param)
				var j2c_tables = this;
				read_sql_with_param($http, {sql:'sql.'+param.sql+'.select'}, function(response){
					j2c_tables.init(response, param);
				});
			}
			,init : function(response, param){
//				console.log(response.data)
				var tables1C = this.tables1C;
				if(!tables1C.scope[param.sql])
					tables1C.scope[param.sql] = {};
				tables1C.scope[param.sql].list = response.data.list;
				console.log(tables1C.scope[param.sql]);
			}
			,tables1C:this
		}
}