



function delete_node() {

	//note: don't need to delete node here since
	//	line delete will check for nodes without lines
	//  and delete them there
	
	//need to make a copy of line list since we'll be changing it on the fly
	var temparray = [];
	for (var i=0; i<objects[scene][current_node].lines.length; i++) {
		temparray[i] = objects[scene][current_node].lines[i];
	}
	
	//get all lines attached to it and delete them
	for (var i=0; i<temparray.length; i++) {
		
		//remove line (and any single nodes, which will include this one)
		var lid = temparray[i];
		delete_line(lid);

	}
	
	//if there's no lines then catch here
	if (temparray.length == 0) {
		var obj = paper.getById(current_node);
		obj.remove();
		objects[scene][current_node] = null;
	}
	
	//array maintenance
	//remove trailing null values
	for (var i=objects[scene].length-1; i>0; i--) {
		if (objects[scene][i] == null) {
			objects[scene].splice(i, 1);
		} else {
			break;
		}
	}

	//reset
	current_node = -1;

}
		
		
		