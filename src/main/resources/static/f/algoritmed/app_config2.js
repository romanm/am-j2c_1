app_config.fn.pages = function($scope){
	this.head=function(){
		$scope.page.pageKey=function(){
			return $scope.programRun.objKeys()[0];
		}
		var pageKey = $scope.page.pageKey();
		$scope.page.head.pageName = app_config.pages[pageKey].alias; 
		if($scope.page.head.tabs_key){
			$scope.page.head.tabs={};
			angular.forEach(app_config.page_head_tabs[$scope.page.head.tabs_key], function(v, k){
				$scope.page.head.tabs[v]=app_config.pages[v];
			});
		}
	}
}
app_config.page_head_tabs = {
	hrm:['employeesCards', 'employee']
}
app_config.pages = {
	employeesCards:{
		link:'/f/eh1/hrm1/employees-cards.html'
		,alias:'Картки кадрів'
	}
	,employee:{
		link:'/f/eh1/employee1.html'
		,alias:'Картка співробітника'
	}
}