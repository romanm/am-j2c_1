function initI2c($scope, $http, $timeout){
	$scope.j2C = {};
	$scope.j2C.treeObjConfig= {
		'Константи':{}
		,'Довідники':{}
		,'Документи':{
			'Общіе реквізіти':{}
			,'Нумератори':{}
			,'Последовательность':{}
		}
		,'Журнали документів':{}
		,'Перечислення':{}
		,'Звіти':{}
		,'Обробки':{}
		,'Плани рахунків':{}
		,'Види субконто':{}
		,'Операції':{}
	};
	$scope.$watch("j2C.tableSelect.historyEditTable.count", function handleChange( newValue, oldValue ) {
		console.log(newValue);
		console.log($scope.j2C.tableSelect.historyEditTable);
		$scope.j2C.tableSelect.historyEditTable.fn_checkToSave();
	});
	$scope.j2C.tableSelect= {
		historyEditTable:{
			count:0
			,data:{}
			,maxChange:10
			,save_count:0
			,autoSaveTextTypingPause:2000
			,add:function(){this.count++;}
			,fn_timeout_checkToSave:null
			,fn_checkToSave:function(){
				if(this.count>this.maxChange){
					this.fn_httpSave();
					this.count=0;
					this.save_count++;
				}
				$timeout.cancel(this.fn_timeout_checkToSave);
				var thisObj = this;
				this.fn_timeout_checkToSave = $timeout(function(){
					if(thisObj.count!=0){
						thisObj.fn_httpSave();
						thisObj.count=0;
						thisObj.save_count++;
					}
				}, this.autoSaveTextTypingPause);
			}
			,fn_httpSave:function(){
				$http.post('/r/table/save', this.data).then(function(response) {
					console.log('/r/table/save');
					console.log(response.data);
				});
			}
		}
		,td:{
			isInEdit:function(r,k){
				var isInEdit = !!$scope.j2C.tableSelect.historyEditTable.data[r.row_id] 
					&& !!$scope.j2C.tableSelect.historyEditTable.data[r.row_id][k];
				return isInEdit;
			}
			,click:function(r,k){
				if($scope.j2C.tableSelect.historyEditTable){
					if(!$scope.j2C.tableSelect.historyEditTable.data[r.row_id])
						$scope.j2C.tableSelect.historyEditTable.data[r.row_id]={};
					$scope.j2C.tableSelect.historyEditTable.data[r.row_id][k]=r['col_'+k];
					$scope.j2C.tableSelect.historyEditTable.add();
				}
			}
		}
	}
	
}
var app = angular.module('j2CApp', []);
app.controller('J2CCtrl', function($scope, $http, $timeout) {
	initI2c($scope, $http, $timeout);
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
