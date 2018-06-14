(function(){

let meSort = {
/****冒泡排序****/
bubbleSort : function(arr){
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
},

/****快速排序****/
quickSort : function q(arr){
    let i=0,
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
    return q(arr.slice(0,i)).concat(arr[i],q(arr.slice(i+1)));
},

/*****选择排序*****/
selectSort : function(arr){
    let len=arr.length;

    for(let i=0;i<len-1;i++){
        let k=i;
        for(let j=i+1;j<len;j++){
            if(arr[j]<arr[k]){
                k=j;
            }
        }
        if(i!==k){
            let temp=arr[k];
            arr[k]=arr[i];
            arr[i]=temp;
        }
    }
    return arr;
},
/**** 插入排序 ****/
insertSort : function(arr){
    let res=[],len=arr.length;
    res[0]=arr[0];
    let k=1;//res长度

    for(let i=1;i<len;i++){ 
        for(let j=0;j<k,k<len;j++){
            if(res[0]>arr[i]){
                res.unshift(arr[i]);
                k++;
                break;
            } else if(res[k-1]<=arr[i]){
                res.push(arr[i]);
                k++;
                break;
            } else if(res[j-1]<=arr[i]&&arr[i]<res[j]){
                res.splice(j,0,arr[i]); 
                k++;
                break;        
            }
        }
    }
    return res;
}
}

window.meSort=meSort;


})();
