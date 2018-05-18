var eventUtil={
	// 获取事件对象
	getEvent:function(event){
		return event||window.event
	},
	// 获取事件所在目标
	getTarget:function(event) {
		return event.target||event.srcElment;
	},
	// 添加时间处理程序
	addHandler:function(element,type,handler) {
		if(element.addEventListener){
			element.addEventListener(type,handler,false);
		}else if(element.attachEvent){
			element.attachEvent('on'+type,handler);
		}else{
			element['on'+type]=handler;
		}
	},
	//移除事件处理程序
	removeHandler:function(element,type,handler){
		if(element.removeEventListener){
			element.removeEventListener(type,handler,false);
		}else if(element.detachEvent){
			element.detachEvent('on'+type,handler);
		}else {
			element['on'+type]=null;
		}
	},
	// 阻止默认事件
	preventDefault:function(event) {
		if(event.preventDefault){
			event.preventDefault();
		}else{
			event.returnValue=true;
		}
	},
	// 阻止进一步冒泡
	stopPropagation:function(event) {
		if(event.stopPropagation){
			event.stopPropagation();
		}else{
			event.cancelBubble=true;
		}
	}
};