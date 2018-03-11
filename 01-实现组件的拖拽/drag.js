function getCSS (obj,sty) {
	return window.getComputedStyle(obj, null)[sty]?window.getComputedStyle(obj, null)[sty]:obj.currentStyle[sty];
}

function drag(eBar,eDrag){
	var x=getCSS(eDrag,"left");//组件横坐标
	var y=getCSS(eDrag,"top");//组件纵坐标
	var e,flag;
	var nowX,firstX;
	var nowY,firstY;

	eBar.onmousedown=function (event) {
		e=event||window.event;
		firstX=e.clientX;//当前鼠标点击时的横坐标
		firstY=e.clientY;//当前鼠标点击时的纵坐标
		flag=true;
	};

	document.onmousemove=function(event){
		e=event||window.event;
		if(flag){
			nowX=e.clientX;
			nowY=e.clientY;
			eDrag.style.left=(parseInt(x)+nowX-firstX)+"px";
			eDrag.style.top=(parseInt(y)+nowY-firstY)+"px";
		}
	};

	eBar.onmouseup=function(event){
		x=getCSS(eDrag,"left");
		y=getCSS(eDrag,"top");
		flag=false;
	};
}