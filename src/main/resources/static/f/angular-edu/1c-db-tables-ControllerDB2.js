app.controller('ControllerDB', function($scope, $http) {
	console.log('-------ControllerDB--------');
	//console.log({ fn_lib:fn_lib , init_am_directive:init_am_directive });
	
	init_am_directive.tablesJ2C_init = function(response, param){
		$scope[param.scopeObj].list = response.data.list;
		if(param.col_keys)
			$scope[param.scopeObj].col_keys = param.col_keys;
		else if(response.data.col_keys)
			$scope[param.scopeObj].col_keys = response.data.col_keys;
	};

	$scope.programRun = {
		create_tables:{
			programFile:{
				TablesJ2C:{scopeObj:'create_tables', param:{sql:'create_tables'}, after:'tables'
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
				TablesJ2C:{scopeObj:'tables', param:{sql:'tables'},col_keys:{
					col_tablename:'Ім´я таблиці'
				}}
				,html_tableJ2C:{}
			}
		}
		,table:{
			programFile:{
				TablesJ2C:{scopeObj:'table', param:{sql:'table'}}
				,html_tableJ2C:{}
			}
		}
	};
	
	console.log($scope)
	
	$scope.page={
		head:{
			pageName:'Таблиці AM j2C_1'
			,headClass:'l5 m6 s8'
			,headLink:'/f/angular-edu/1c-db-tables.headLink.html'
		}
	};
	$scope.algoritmed = {programs:{} ,htmls:{} ,dbs:{} ,inits:{} };
});

init_am_directive.ele_v.tableJ2C = function(ele, v){
	var lastChildEle = ele[0].children[1-ele[0].children.length];
	var scopeObj = v.parent.TablesJ2C[lastChildEle.getAttribute('am-obj')];
	lastChildEle.setAttribute('ng-repeat','o in ['+scopeObj+']')
}

	/*
	var tablesJ2C = new fn_lib.TablesJ2C($scope, $http);
	tablesJ2C.j2c_tables.http_get({sql:'table'});
	tablesJ2C.j2c_tables.http_get({sql:'create_tables', after:'tables'
		,col_keys:{
			tablename:'Таблиця'
			,fieldname:'Колонка'
			,fieldtype:'Тип даних'
		}
	});
	tablesJ2C.j2c_tables.http_get({sql:'tables',col_keys:{
		col_tablename:'Ім´я таблиці'
	}});
	 * */
