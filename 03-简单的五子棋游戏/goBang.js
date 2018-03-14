// 定义全局变量
var board,ctx,operation;
var boardX=50,//棋盘在画布中的横坐标
	boardY=50,//棋盘在画布中的纵坐标
	side=0,//0：黑子；1：白子
	canvasX,//画布的横坐标
	canvasY,//画布的纵坐标
	x=[],
	y=[],//棋盘中落子处的坐标
	arr=[];//棋盘矩阵，用于判断落子的位置

window.onload=init;

function init(){

	board=document.getElementById("chessboard");
	operation=document.getElementById("btns");
	canvasX=parseInt(getCSS(board,"left"));
	canvasY=parseInt(getCSS(board,"top"));
	//初始化棋盘落子点的坐标
	for (var i = 15; i >= 0; i--) {
		x[i]=40*i+boardX+canvasX;
		y[i]=40*i+boardY+canvasY;
	}
	//初始化棋盘矩阵
	for (var i = 15; i >= 0; i--) {
		arr[i]=[];
		for (var j = 15; j >= 0; j--) {
			arr[i][j]=8;
		}
	}
	//画棋盘
	initBoard();
	operation.onclick=doOperation;
	
}
/*初始化游戏界面*/
function initBoard(){
	
	ctx=board.getContext("2d");
	/*画棋盘
	  棋盘规格15*15，每一格40px*/
	ctx.beginPath();
	for(var i=0;i<=15;i++){
		// 画横线
		 ctx.moveTo(boardX,i*40+boardY);
		 ctx.lineTo(600+boardX,i*40+boardY);
		// 画竖线
		 ctx.moveTo(i*40+boardX,boardY);
		 ctx.lineTo(i*40+boardX,600+boardY);
	}
	ctx.stroke();//渲染棋盘
	/*初始化棋盘点击事件*/
	board.onclick=addChessmen;
}

function addChessmen(event){
	e=event||window.event;
	//如果有滚动条，需要计算滚动条高度
	var scrollTop=getScrollTop();
	console.log(scrollTop);
	//获取鼠标点击的绝对坐标
	var nowX=e.clientX;
	var nowY=e.clientY;
	console.log(nowX+","+nowY);
	//计算得到棋子相对画布的坐标
	var chessX;
	var chessY;

	for(var i=0;i<16;i++){
		if (nowX>=x[i]-20&&nowX<x[i]+20) {
			chessX=x[i]-canvasX;
			break;
		}
	}
	for(j=0;j<16;j++){
		if (nowY>=y[j]-20&&nowY<y[j]+20) {
			chessY=y[j]-canvasY+scrollTop;
			break;
		}
	}
	//判断这个点是否已经落过棋子
	if(arr[i][j]!=8){
		return null;
	}
	//判断棋子的颜色
	if(side) ctx.fillStyle="#FFFFFF";
	else ctx.fillStyle="#000"
	//画棋子
	ctx.beginPath();
	ctx.moveTo(chessX,chessY);
	ctx.arc(chessX,chessY,15,0,2*Math.PI,false);
	ctx.fill();
	//更新棋盘矩阵
	arr[i][j]=side;
	console.log((i-1)+" "+j+" "+side);

	//判断是否赢棋
	var result=isSuccess(i,j,side);
	if(result){
		if(side)alert("白子赢了！");
		else alert("黑子赢了！");
		board.onclick=null;
		return null;
	}
	side=side?0:1;
}

function isSuccess(i,j,side){
	var inside=side?0:1;
	var count=1;
	//判断横向
	for(var x=1;x<5,i+x<=16;x++){
		if(arr[i+x][j]==side)count++;
		else break;
	}
	for(x=1;x<5,i-x>=0;x++){
		if(arr[i-x][j]==side)count++;
		else break;
	}
	if(count==5)return true;
	//判断左斜方向
	count=1;
	for(x=1;x<5,i-x>=0,j-x>=0;x++){
		if(arr[i-x][j-x]==side)count++;
		else break;
	}
	for(x=1;x<5,i+x<=16,j+x<=16;x++){
		if(arr[i+x][j+x]==side)count++;
		else break;
	}
	if(count==5)return true;
	//判断右斜方向
	count=1;
	for(x=1;x<5,i+x<=16,j-x>=0;x++){
		if(arr[i+x][j-x]==side)count++;
		else break;
	}
	for(x=1;x<5,i-x>=0,j+x<=16;x++){
		if(arr[i-x][j+x]==side)count++;
		else break;
	}
	if(count==5)return true;
	//判断竖向
	count=1;
	for(var x=1;x<5,j+x<=16;x++){
		if(arr[i][j+x]==side)count++;
		else break;
	}
	for(x=1;x<5,j-x>=0;x++){
		if(arr[i][j-x]==side)count++;
		else break;
	}
	if(count==5)return true;

	return false;
}
//获取样式
function getCSS (obj,sty) {
	return window.getComputedStyle(obj, null)[sty]?window.getComputedStyle(obj, null)[sty]:obj.currentStyle[sty];
}

//获取滚动条高度
function getScrollTop(){
	var scrollTop=0;
    if(document.documentElement&&document.documentElement.scrollTop) scrollTop=document.documentElement.scrollTop;
	else if(document.body) scrollTop=document.body.scrollTop;
    return scrollTop;
}

function doOperation(){
	clearCanvas();
	initBoard();
}

//清除画布
function clearCanvas(){
	ctx.clearRect(0,0,board.width,board.height);
}