var app = angular.module('j2CApp', []);
app.controller('J2CCtrl', function($scope, $http) {
	$scope.firstName= "John";
	$scope.lastName= "Doe";
	$scope.tableTable= {
		tablename:'Таблиця'
		,fieldname:'Колонка'
		,fieldtype:'Тип даних'
	};

	var urls = ['/r/tables/select', '/r/create_tables/select', '/r/table/select']
	console.log(urls[0]);
	$http.get(urls[0]).then(function(response) {
		$scope.tablesSelect = response.data;
		console.log($scope.tablesSelect);
	});

	console.log(urls[1]);
	$http.get(urls[1]).then(function(response) {
		$scope.createTableSelect = response.data;
		console.log($scope.createTableSelect);
	});

	console.log(urls[2]);
	$http.get(urls[2]).then(function(response) {
		$scope.tableSelect = response.data;
		console.log($scope.tableSelect);
		$scope.col_alias = response.data.col_alias;
		console.log($scope.col_alias);
	});

});