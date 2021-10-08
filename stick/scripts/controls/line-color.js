



function set_color(cid) {

	//need check if there's a line selected
	if (current_line == -1) {
		return;
	}
	
	//need check if there's only one line selected
	if(line_set.length != 0) {
		return;
	}
	
	
	//update line
	var obj = paper.getById(current_line);
	obj.attr('stroke', '#'+cid);
	
	
	//update data
	objects[scene][current_line].color = '#'+cid;
	
}




