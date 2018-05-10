(function(){//形成闭包

var videoWrapper,
	videoBox,
	videoPlay,
	video,
	playOffBtn,
	playOffBtnIcon,
	fullScreen,
	fullScreenBtn,
	progressPlayed;

var playOffHander=function(){
	if(playOffBtnIcon){
		var name=playOffBtnIcon.className;
		if(!video.paused){
			name=name.replace("to-pause","to-play");
			playOffBtnIcon.className=name;
			video.pause();
		}else {
			name=name.replace("to-play","to-pause");
			playOffBtnIcon.className=name;
			video.play();
		}
	}
};

var updateTime=function(){
	clearTimeout(t);
	var video = document.getElementsByTagName("video")[0];
	var recentTime=document.getElementsByClassName("recent-time")[0];
	recentTime.firstChild.nodeValue=timeToRegular(video.currentTime);
	if(!video.ended){
		var t= setTimeout(arguments.callee,1000);
	}else{
		clearTimeout(t);
	}	
};

var timeToRegular=function(t){
	var hour=parseInt(t/3600);
	var minute=parseInt(t/60)-hour*60;
	var second=parseInt(t-hour*3600-minute*60);
	minute=minute>=10?minute:("0"+minute);
	second=second>=10?second:("0"+second);
	var time=hour+":"+minute+":"+second;
	return time;
};
//处理不同游览器全屏API不同
/*
	requestFullScreen();加前缀，如mozRequestFullScreen或webkitRequestFullScreen
	cancelFullScreen();加前缀，如mozCancelFullScreen或webkitCancelFullScreen
	判断浏览器是否处于全屏状态：document.fullScreen；document.webkitIsFullScreen;document.mozFullScreen；webkit内核的加了一个is
*/
var fixFullscreenMethod=function(element,method){
	var methodDone;
	["webkit", "moz", "ms", "o", ""].forEach(function(prefix) {
        if (methodDone) return;
        if (prefix === "") {
            // 无前缀，方法首字母小写
            method = method.slice(0,1).toLowerCase() + method.slice(1);     
        }            
        var typeMethod = typeof element[prefix + method];            
        if (typeMethod + "" !== "undefined") {
            if (typeMethod === "function") {
                methodDone = element[prefix + method]();
            } else {
                methodDone = element[prefix + method];
            }
        }
    });
	return methodDone;
};
//全屏事件处理
var fullScreenHandler=function(){
	var style=fullScreenBtn.className;
	if(fixFullscreenMethod(document,"FullScreen")||fixFullscreenMethod(document,"IsFullScreen")||fixFullscreenMethod(document,"ExitFullscreen")){
		fixFullscreenMethod(document,"CancelFullScreen");	
		style=style.replace("off-fullscreen","to-fullscreen");	
	}else{
		fixFullscreenMethod(videoBox,"RequestFullScreen");
		style=style.replace("to-fullscreen","off-fullscreen");
	}
	fullScreenBtn.className=style;
};

var  getCSS =function(obj,sty) {
	return window.getComputedStyle(obj, null)[sty]?window.getComputedStyle(obj, null)[sty]:obj.currentStyle[sty];
};

var dragBox=function(element,moveScale,moveBar){
	var y=getCSS(element,"bottom");
	var e,flag;
	var nowY,firstY;

	element.onmousedown=function (event) {
		e=event||window.event;
		firstY=e.clientY;//当前鼠标点击时的纵坐标
		flag=true;
	};

	moveScale.onmousemove=function(event){
		e=event||window.event;
		nowY=e.clientY;
		var bottomNum=parseInt(y)+firstY-nowY;
		if(flag){
			if(bottomNum>=10&&bottomNum<=110){
				element.style.bottom=bottomNum+"px";
				moveBar.style.bottom=bottomNum+"px";
				moveBar.style.height=(110-bottomNum)+"px"
				video.volume=(bottomNum-10)/100;
			}else if(bottomNum<10){
				element.style.bottom="10px";
				moveBar.style.bottom="10px";
				moveBar.style.height="100px";
				video.volume=0;
			}else if(bottomNum>110){
				element.style.bottom="110px";
				moveBar.style.bottom="110px";
				moveBar.style.height="0px";
				video.volume=1;
			}
		}
	};

	document.onmouseup=function(event){
		y=getCSS(element,"bottom");
		flag=false;
	};
};

var volumeInit=function(element,moveBar){
	var volume=video.volume;
	var bottomNum=volume*100+10;
	element.style.bottom=bottomNum+"px";
	moveBar.style.bottom=bottomNum+"px";
	moveBar.style.height=(110-bottomNum)+"px";
};

var updateProgress=function(){
	clearTimeout(m);
	var currentTime=video.currentTime;
	var length=video.duration;
	progressPlayed.style.width=currentTime/length*100+"%";
	if(!video.ended){
		var m= setTimeout(arguments.callee,1000);
	}else{
		clearTimeout(m);
	}
}

var init=function(){
	videoWrapper=document.querySelector(".video-wrapper");
	videoBox=document.querySelector(".video");
	videoPlay=document.querySelector(".video-play");
	video=document.querySelector("video");
	playOffBtn=document.querySelector(".video-control-btn");
	//播放/暂停
	playOffBtnIcon=playOffBtn.firstElementChild;
	playOffBtn.onclick=playOffHander;
	videoPlay.onclick=playOffHander;
	//显示视频总时间与当前播放时间
	var videoLength=timeToRegular(video.duration);
	var allTime=document.getElementsByClassName("all-time")[0];
	allTime.firstChild.nodeValue=videoLength;
	updateTime();
	//处理全屏
	fullScreen=document.getElementsByClassName("video-control-fullscreen")[0];
	fullScreenBtn=fullScreen.firstElementChild;
	fullScreen.onclick=fullScreenHandler;
	videoPlay.ondblclick=fullScreenHandler;
	//处理音量调整
	var volumeControlBtn=document.querySelector(".volume-current");
	var volumeControlBar=document.querySelector(".volume-control-box");
	var volumeControlCurrentBar=document.querySelector(".volume-control-current");
	volumeInit(volumeControlBtn,volumeControlCurrentBar);
	dragBox(volumeControlBtn,volumeControlBar,volumeControlCurrentBar);
	//处理进度条
	var progress=document.querySelector(".video-control-progress");
	progressPlayed=document.querySelector(".video-played");
	progress.onclick=function(event){
		var e=event||window.event;
		var x=e.clientX;//获取鼠标点击的横坐标
		var allX=getCSS(videoWrapper,"left");//获取视频左侧的横坐标
		var length=getCSS(progress,"width");
		var percent=((x-parseInt(allX))/parseFloat(length))*100;
		progressPlayed.style.width=percent+"%";
		video.currentTime=percent/100*video.duration;
	}

	updateProgress();
	//鼠标滑入/滑出视频，控制条出现/隐藏，进度条位置变化效果
	var videoControl=document.querySelector(".video-control-box");
	videoPlay.onmouseover=function(){
		videoControl.style.display="block";
		progress.style.top="-45px";
		progress.style.height="3px";
		// console.log("in");
	};
	videoPlay.onmouseout=function(){
		videoControl.style.display="none";
		progress.style.top="39px";
		progress.style.height="3px";
		// console.log("out");
	};
	progress.onmouseover=function(){
		videoControl.style.display="block";
		progress.style.top="-58px";
		progress.style.height="16px";
	};
	progress.onmouseout=function(){
		progress.style.top="-45px";
		progress.style.height="3px";
	};
}	
// window.onload=init;
this.video=init;
})();
//直接调用
window.onload=video;
