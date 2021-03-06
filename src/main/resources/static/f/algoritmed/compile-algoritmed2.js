var app = angular.module('app', []);
var app_config = {fn:{}};
var fn_lib = {};
var init_am_directive = {
		ele_v:{}
		,init_programRuns:function($scope){
			if(app_config.fn.pages)
				new app_config.fn.pages($scope).head();
			angular.forEach($scope.programRun, function(v, key_programName){
				if(!v.programFile.commonArgs)
					v.programFile.commonArgs = {};
				if(!v.programFile.commonArgs.scopeObj)
					v.programFile.commonArgs.scopeObj = key_programName;
				var commonArgs = v.programFile.commonArgs;
				angular.forEach(v.programFile, function(v2, key_commandName){
					v2.commonArgs = commonArgs;
				});
			});
		}
};
init_am_directive.list2map = function(l,o,id_key,key){
	o['map_'+key] = {};
	o['list_'+key] = [];
	angular.forEach(l, function(v, k){
		var id = v[id_key];
		o['map_'+key][id] = v;
		o['list_'+key][k] = id;
	});
};


app.directive('amdRun', function ($compile, $http) {
	return {
		restrict: 'EA',
		scope: false,
		link: function (scope, ele, attrs) {
			scope.$watch(attrs['amdRun'], function(program_init) {
				if(program_init.amProgramPath){
					//read a program 1 - to run program
					read_am_json_source(scope, ele, program_init.amProgramPath, $compile, $http);
				}else
				if(program_init.programFile){
					run_am_program(program_init, scope, $http, ele, $compile);
				}else
				if(program_init.programId){
					if(!scope.algoritmed.inits[program_init.programId]){
						scope.algoritmed.inits[program_init.programId] = program_init;
					}
				}
				if(program_init.html){
					ele.html(program_init.html);
					$compile(ele.contents())(scope);
				}
			});
		}
	};
});

function run_am_program(program_init, scope, $http, ele, $compile){
	angular.forEach(program_init.programFile, function(v, k){
//						console.log(k+' -- '+program_init.programFile.commonArgs.scopeObj)
		v.parent=program_init.programFile;
		if(fn_lib[k]){
			if('TablesJ2C'==k){
				var tablesJ2C = new fn_lib.TablesJ2C(scope, $http);
				tablesJ2C.j2c_tables.http_get(v);
			}
		}else
			if(k.includes("html_")){
				read_am_html_source(scope, ele, v, k, $compile, $http);
			}
	});
}

function read_am_json_source(scope, ele, amProgramPath, $compile, $http){
	$http.get(amProgramPath).then(function(response){
		var amProgramRun = response.data;
		angular.forEach(amProgramRun, function(v, k){
			read_am_html_source(scope, ele, v, k, $compile, $http);
		});
	});
};

function read_am_html_source(scope, ele, v, k, $compile, $http){
	if(k.includes("html_")){
		var k1 = k.replace('html_','');
		var amdRun_pr_uri = v.source_path;
		if(!v.source_path)
			amdRun_pr_uri = '/f/algoritmed/lib/'+k1+'.html';
		console.log(amdRun_pr_uri)
		//read a program 2 - from library level 1 in run program
		$http.get(amdRun_pr_uri).then(function(response) {
			var pr = response.data;
			ele.html(pr);
			var id2 = ele[0].id+'__'+k1;
			scope.algoritmed.inits[id2]=v;
			if(init_am_directive.ele_v[k1])
				init_am_directive.ele_v[k1](ele, v);
			else 
			if(init_am_directive[k1])
				init_am_directive[k1](scope, ele, id2);
			var pr3 = ele[0].children[1-ele[0].children.length];
			pr3.setAttribute('amd-'+k1,'"'+id2+'"');
			$compile(ele.contents())(scope);
		})
	}
};

app.directive('amdPrintln', function ($compile, $http) {
	return {
		restrict: 'EA',
		scope: true,
		link: function (scope, ele, attrs) {
			scope.$watch(attrs['amdPrintln'], function(obj_key) {
				var program_init = scope.algoritmed.inits[obj_key];
				if(program_init.isObject()){
					angular.forEach(program_init, function(v, k){
//						if(key_words[k]){}else
						if(k.indexOf('text_')==0){
							ele.html(v);
						}
					});
					init_am_directive.add_fn(program_init);
					angular.forEach(program_init.add_fn, function(v, k){
						ele.html(program_init[v]());
					});
					
				}else
				if((typeof program_init) == 'string'){
					ele.html(program_init);
				}
				$compile(ele.contents())(scope);
			});
	}	};
});

init_am_directive.translate_am_att = function(ele, v){
	if(ele.hasAttribute('am-link')){
		var a = document.createElement("a");
		a.setAttribute('href', v.parent.links[ele.getAttribute('am-link')]);
		a.innerHTML = ele.innerHTML;
		ele.innerHTML = a.outerHTML;
	}
	if(ele.children)
		angular.forEach(ele.children, function(ele1, k1){
			init_am_directive.translate_am_att(ele1, v);
		});
}

init_am_directive.ele_v.form_type01 = function(ele, v){
	var lastChildEle = ele[0].children[1-ele[0].children.length];
	init_am_directive.translate_am_att(lastChildEle, v);
	var scopeObj = v.commonArgs[lastChildEle.getAttribute('am-obj')];
	var ngRepeat = lastChildEle.getAttribute('ng-repeat');
	ngRepeat = ngRepeat.replace('scopeObj',scopeObj);
	lastChildEle.setAttribute('ng-repeat',ngRepeat);
}
init_am_directive.ele_v.tableJ2C = function(ele, v){
	var lastChildEle = ele[0].children[1-ele[0].children.length];
	var scopeObj = v.commonArgs[lastChildEle.getAttribute('am-obj')];
	lastChildEle.setAttribute('ng-repeat','o in ['+scopeObj+']')
}

fn_lib.TablesJ2C = function (scope, $http){
//console.log('-------TablesJ2C--------');
this.scope = scope;
this.j2c_tables = {
		http_get : function(param){
			console.log(param.url?param.url:url_read_sql_with_param);
			console.log(param)
			if(param.param.sql){
				if(param.param.sql.indexOf('.select')<0)
					param.param.sql = 'sql.'+param.param.sql+'.select';
			}
			var j2c_tables = this;
			var read_http_get = function(){
				read_sql_with_param($http, param.param, function(response){
					j2c_tables.init(response, param);
				});
			}
			if(!param.after)	read_http_get();
			else
				scope.$watch(param.after,function() {
					if(scope[param.after])
						read_http_get()
				});
		}
		,init : function(response, param){
//			console.log(response.data)
			var scopeObj = param.commonArgs.scopeObj;
			var tablesJ2C = this.tablesJ2C;
			if(!tablesJ2C.scope[scopeObj])
				tablesJ2C.scope[scopeObj] = {};
			console.log(scopeObj)
			if(init_am_directive[scopeObj] && init_am_directive[scopeObj].tablesJ2C_init)
				init_am_directive[scopeObj].tablesJ2C_init(response, param);
			else
			if(init_am_directive.tablesJ2C_init)
				init_am_directive.tablesJ2C_init(response, param);
//			console.log(tablesJ2C.scope[scopeObj]);
		}
		,tablesJ2C:this
	}
}

init_am_directive.add_fn = function(program_init){
	angular.forEach(program_init.add_fn, function(v, k){
		program_init[v]=fn_lib[v];
	})					
}

// url_read_sql_with_param -- is rewritable in Controller file by demand 
var url_read_sql_with_param = '/r/read_sql_with_param';
var read_sql_with_param = function($http, params,fn, fn_error){
	var url = params.url?params.url:url_read_sql_with_param;
	if(!fn_error){
		$http.get(url, {params:params}).then(fn);
	}else{
		$http.get(url, {params:params}).then(fn, fn_error);
	}
}

Object.prototype.isFunction = function(){
	return typeof this == 'function'
};

Object.prototype.isObject = function(){
	return (''+this).indexOf('Object')>=0;
};

Object.prototype.objKeys = function(){
	return Object.keys(this);
};

