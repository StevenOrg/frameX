var count = 0;

function startCount(){
	postMessage(count);
	count ++;
	setTimeout(startCount,1000);
}

startCount();