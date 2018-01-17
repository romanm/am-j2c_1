function init_algoritmedjs($scope, $http, $timeout, $compile){
	console.log('init_algoritmedjs');	
	$scope.algoritmed = {
		programs:{}
		,htmls:{}
		,dbs:{}
		,inits:{}
		,println:function(v, program_json){
			console.log(v);
			$scope.algoritmed.read_html('println', '/f/algoritmed/lib/println.html', true, program_json);
		}
		,execute:function(program_json){
			console.log($scope.algoritmed);
			console.log(program_json);
			angular.forEach(program_json, function(v, k) {
				if($scope.algoritmed[k])
					$scope.algoritmed[k](v,program_json);
			});
		}
		,run:function(fn){
			angular.forEach(fn, function(file, program) {
				if(!$scope.algoritmed.programs[program]){
					$scope.algoritmed.programs[program]= {};
					$scope.algoritmed.read_json(program, file, true);
				}
			});
		}
		,read_html:function(program_html, url, read_and_run, program_json){
			$http.get(url).then(function(response) {
				console.log(program_html);
				console.log(url);
				console.log(response.data);
				$scope.algoritmed.htmls[program_html]= response.data;
				if(read_and_run){
					var ael = program_json.element;
					var html = $scope.algoritmed.htmls[program_html];
					ael.html(html);
					$compile(ael.contents())($scope);
				}
			});
		}
		,read_json:function(program, url, read_and_run){
			console.log(url)
			if(Object.keys($scope.algoritmed.programs[program]).length==0){
				$http.get(url).then(function(response) {
					if(Object.keys($scope.algoritmed.programs[program]).length==0){
						$scope.algoritmed.programs[program]= response.data;
						$scope.algoritmed.programs[program].programName= program;
						var el = document.querySelector( "#"+program );
						var ael = angular.element(el)
						$scope.algoritmed.programs[program].element = ael;
						if(read_and_run){
							$scope.algoritmed.execute($scope.algoritmed.programs[program]);
						}
					}
				});
			}
		}
	}
}
