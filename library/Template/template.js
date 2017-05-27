function _type(value) {
   return Object.prototype.toString.call(value).slice(8).slice(0, -1).toLowerCase();
}
function template(str,obj){
	if(typeof str ==='string'){
		var tm = str.replace(/<%=\s*([^%>]+)\s*%>/g,function(value,name){
			return "' + obj."+name;
		})
		tm = "return '"+tm;
		//var compile = new Function('obj',tm);
		//return compile(obj);
	}else{

	}
}

var Template= (function(){
	var cache = {};
	return function(str,obj){
		if(!typeof str === 'string'){
			return;
		}
		var compile = cache[str];
		if(!cache[str]){
			var tm = str.replace(/<%=\s*([^%>]+)\s*%>/g,function(){
				var key = arguments[1];
				return "'+"+key;
			})
			tm = "var tmp = \"\";with(obj){tmp='"+tm+";}return tml;";
			//compile = new Function('obj',tm);
			//cache[str] = compile;
		}
		//return compile(obj);
	}
}())


function tmpl(str, data) {
	var fn = !/\W/.test(str) 
		?cache[str] = cache[str] || tmpl(document.getElementById(str).innerHTML)
		:new Function(
			"obj",
			"var p=[],print=function(){p.push.apply(p,arguments);};" + 
			"with(obj){p.push('" + 
			str
				.replace(/[\r\t\n]/g, " ")
				.replace(/'(?=[^%]*%>)/g, "\t")
				.split("'").join("\\'")
				.split("\t").join("'")
				.replace(/<%=(.+?)%>/g, "',$1,'")
				.split("<%").join("');")
				.split("%>").join("p.push('") + 
				"');}return p.join('');"
			);
	return data ? fn(data) : fn;
}

