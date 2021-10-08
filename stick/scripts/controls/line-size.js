


function change_line_size(size) {

	//need check if there's a line selected
	if (current_line == -1) {
		return;
	}
	
	//need check if there's only one line selected
	if(line_set.length != 0) {
		return;
	}
	
	//get current size
	var currentsize = objects[scene][current_line].size;
	
	//get new size
	if (size == 'up') {
		var newsize = currentsize + 1;
	} else if (size == 'down') {
		var newsize = currentsize - 1;
		if (newsize < 1) { newsize = 1; }
	} else {
		var newsize = size;
	}
	
	//update line
	var obj = paper.getById(current_line);
	obj.attr('stroke-width', newsize);
	
	
	//update data
	objects[scene][current_line].size = newsize;
	

}

