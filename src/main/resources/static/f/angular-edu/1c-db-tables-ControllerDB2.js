app.controller('ControllerDB', function($scope, $http) {
	console.log('-------ControllerDB--------');
	console.log({
		fn_lib:fn_lib
		, init_am_directive:init_am_directive
	});
	$scope.algoritmed = {programs:{} ,htmls:{} ,dbs:{} ,inits:{} };
	$scope.programRun = {
		create_tables:{
			programFile:{
				scopeObj:'create_tables'
				,TablesJ2C:{sql:'create_tables', after:'tables'
					,col_keys:{
						tablename:'Таблиця'
						,fieldname:'Колонка'
						,fieldtype:'Тип даних'
					}
				}
				,html_tableJ2C:{}
			}
		}			
		,tables:{
			programFile:{
				scopeObj:'tables'
					,TablesJ2C:{sql:'tables',col_keys:{
						col_tablename:'Ім´я таблиці'
					}}
				,html_tableJ2C:{}
			}
		}
		,table:{
			programFile:{
				scopeObj:'table'
				,TablesJ2C:{sql:'table'}
				,html_tableJ2C:{}
			}
		}
	};
	console.log($scope)
	/*
	var tablesJ2C = new fn_lib.TablesJ2C($scope, $http);
	tablesJ2C.j2c_tables.http_get({sql:'create_tables', after:'tables'
		,col_keys:{
			tablename:'Таблиця'
			,fieldname:'Колонка'
			,fieldtype:'Тип даних'
		}
	});
	tablesJ2C.j2c_tables.http_get({sql:'table'});
	tablesJ2C.j2c_tables.http_get({sql:'tables',col_keys:{
		col_tablename:'Ім´я таблиці'
	}});
	 * */
});

init_am_directive.ele_v.tableJ2C = function(ele, v){
	var lastChildEle = ele[0].children[1-ele[0].children.length];
	var scopeObj = v.parent[lastChildEle.getAttribute('am-obj')];
	lastChildEle.setAttribute('ng-repeat','o in ['+scopeObj+']')
}

fn_lib.TablesJ2C = function (scope, $http){
	console.log('-------TablesJ2C--------');
	this.scope = scope;
	this.j2c_tables = {
			http_get : function(param){
				console.log(param)
				var j2c_tables = this;
				var read_http_get = function(){
					read_sql_with_param($http, {sql:'sql.'+param.sql+'.select'}, function(response){
						j2c_tables.init(response, param);
					});
				}
				if(!param.after)	read_http_get();
				else
					scope.$watch(param.after,function() {
						if(scope[param.after]){
							console.log(scope[param.after]);
							read_http_get()
						}
					});
			}
			,init : function(response, param){
//				console.log(response.data)
				var tablesJ2C = this.tablesJ2C;
				if(!tablesJ2C.scope[param.sql])
					tablesJ2C.scope[param.sql] = {};
				tablesJ2C.scope[param.sql].list = response.data.list;
				if(param.col_keys)
					tablesJ2C.scope[param.sql].col_keys = param.col_keys;
				else if(response.data.col_keys)
					tablesJ2C.scope[param.sql].col_keys = response.data.col_keys;
				console.log(tablesJ2C.scope[param.sql]);
			}
			,tablesJ2C:this
		}
}
