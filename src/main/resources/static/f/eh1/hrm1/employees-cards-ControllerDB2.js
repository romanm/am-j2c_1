var url_read_sql_with_param = '/r/read2_sql_with_param';

app.controller('ControllerDB', function($scope, $http) {
	console.log('-------ControllerDB--------');
	console.log($scope)
	$scope.programRun = {
		employeesCards:{
			programFile:{
				TablesJ2C:{param:{sql:'msp_employee',msp_id:723}}					
				,html_form_type01:{source_path:'/f/eh1/hrm1/employees-cards-table.html'}
			}
		}
	};
	
	init_am_directive.employeesCards = {
			tablesJ2C_init:function(response, param){
				console.log(response.data)
				init_am_directive.list2map(response.data.list_0,$scope.employeesCards,'person_id','employees');
				init_am_directive.list2map(response.data.list,$scope.employeesCards,'user_id','user');
			}
	}
	init_am_directive.init_programRuns($scope.programRun);
	$scope.page={
		head:{
			pageName:'Employees cards'
				,headClass:'l5 m6 s8'
					,headLink:'/f/angular-edu/1c-db-tables.headLink.html'
		}
	};
	$scope.algoritmed = {programs:{} ,htmls:{} ,dbs:{} ,inits:{} };
});