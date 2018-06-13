(function(){

/****冒泡排序****/	
let bubbleSort=function(arr){
	let len=arr.length;
	for(let i=0;i<len;i++){
		for(let j=0;j<len-i-1;j++){
			if (arr[j] > arr[j+1]) {
				let temp = arr[j+1]; 
　　　　　　　　		arr[j+1] = arr[j];
　　　　　　　　		arr[j] = temp;
　　　　　　　　}
		}
	}
	return arr;
}
window.bubbleSort=bubbleSort;

/****快速排序****/
let QuickSort = function quickSort(arr){
    var i=0,
        j=arr.length-1,
        key=arr[0];
    if(arr.length===1){return arr;}
    
        while(arr[j]>=key&&i<j){
            j--;
        }
        if(i<j){
            arr[i]=arr[j];
            i++;        
        }
        while(arr[i]<=key&&i<j){
            i++;
        }
        if(i<j){
            arr[j]=arr[i];
            j--;
        }
    arr[i]=key;
    return quickSort(arr.slice(0,i)).concat(arr[i],quickSort(arr.slice(i+1)));
} 
window.quickSort=QuickSort;

/*****选择排序*****/






/********插入排序********/
})();
