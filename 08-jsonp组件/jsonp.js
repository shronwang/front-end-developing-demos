
(function(w){
	var jsonp=function(url,data,callback){
		//组装url
		var param = url.indexOf(?)==-1?'?':'&';
		for(key in data){
			param += key+'='+encodeURIComponent(data[key])+'&';
		}
		var func='jsonp_func'+ Math.random().toString().replace('.','');
		param +='callback='+func;

		var script=document.createElement('script');
		script.src = url + param;

		window[func]=function(data){
			callback(data);
            // 处理完回调函数的数据之后，删除jsonp的script标签
            document.body.removeChild(script);
		}

		document.body.appendChild(script);

		window.$jsonp=jsonp;
	}
})(window);


/**usage
***$jsonp('http://api.xxxxx/xxxxx/xxx',
          {
            count:10,start:5
          },
          function(data){
                document.getElementById('result').innerHTML=JSON.stringify(data);
          });
******/