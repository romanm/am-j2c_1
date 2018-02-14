var url_read_sql_with_param = '/r/read2_sql_with_param';

app.controller('ControllerDB', function($scope, $http) {
	console.log('-------ControllerDB--------');
	console.log($scope)
	$scope.programRun = {
		employeesCards:{
			programFile:{
				TablesJ2C:{param:{sql:'msp_employee',msp_id:723}}					
				,html_form_type01:{source_path:'/f/eh1/hrm1/employees-cards-table.html'}
				,links:{
					link_to_employee:'/f/eh1/employee1.html#id_{{employee_id}}'
				}
			}
		}
	};
	
	init_am_directive.employeesCards = {
		tablesJ2C_init:function(response, param){
			init_am_directive.list2map(response.data.list_0,$scope.employeesCards,'person_id','employees');
			init_am_directive.list2map(response.data.list,$scope.employeesCards,'user_id','user');
		}
	};

	$scope.page={
		head:{
			pageName:'Employees cards'
			,headFilePath:'/f/algoritmed/lib/page.head2.html'
			,headClass:'l5 m6 s8'
			,headLink:'/f/angular-edu/1c-db-tables.headLink.html'
			,tabs_key:'hrm'
		}
	};
	init_am_directive.init_programRuns($scope);
	$scope.algoritmed = {programs:{} ,htmls:{} ,dbs:{} ,inits:{} };
});