


//find location of item in array and return index
//otherwise return null (not in array)
function arrayLocation(arr,item) {
	var index = null;
	for (var i=0; i<arr.length; i++) {
		if (arr[i] == item) {
			index = i;
		}
	}
	return index;
}





