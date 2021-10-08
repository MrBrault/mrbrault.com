



//this function provides the dx/dy during drag
//this is the same as the node drag but it's tied to a line object
function drag_line(dx, dy, x, y){

	//get new mouse location
	var newX = x;
	var newY = y;
	//get true dx/dy
	trueDx = (newX - startX) / scale;
	trueDy = (newY - startY) / scale;
	//save current location for next pass
	startX = newX;
	startY = newY;

	//custom function for sets
	if(line_set.length != 0) {
		move_set(trueDx, trueDy);
		return;
	}
	
	//otherwise just move one line (2 nodes)
	
	//get line id
	var lid = this.id;
	//get node ids
	var n1id = objects[scene][lid].node1;
	var n2id = objects[scene][lid].node2;
	
	//move nodes
	move_node(n1id, trueDx, trueDy);
	move_node(n2id, trueDx, trueDy);

};




//this function does the actual moving for a given x,y coordinate
//no dx/dy needed because we're matching the node location (passed x,y)
function move_line(lid, nid, x, y) {
	
	//get which end this node belongs to
	var n1id = objects[scene][lid].node1;
	var n2id = objects[scene][lid].node2;
	var lside = (nid == n1id) ? 0 : 1;
	
	//get line object
	var obj = paper.getById(lid);
	
	//get the path data
	var pathArray = obj.attr('path');
	//update path data
	pathArray[lside][1] = x;
	pathArray[lside][2] = y;
	//update line
	obj.attr({path: pathArray});
	
}





function line_horz() {

	//need check if there's a line selected
	if (current_line == -1) {
		return;
	}
	
	//need check if there's only one line selected
	if(line_set.length != 0) {
		return;
	}
	
	//get the node coordinates
	var n1 = objects[scene][current_line].node1;
	var n1y = objects[scene][n1].y;
	var n2 = objects[scene][current_line].node2;
	var n2y = objects[scene][n2].y;
	
	//get the horz center
	var centerY = (n1y + n2y) / 2;
	var dy = Math.abs(n1y - centerY);
	
	if (n1y > centerY) {
		move_node(n1, 0, -dy);
		move_node(n2, 0, dy);
	} else {
		move_node(n1, 0, dy);
		move_node(n2, 0, -dy);
	}
	
	//if it's an arc then move 3rd node
	if (objects[scene][current_line].type == 'arc') {
		var n3 = objects[scene][current_line].node3;
		var n3y = objects[scene][n3].y;
		var dy = Math.abs(n3y - centerY);
		if (n3y > centerY) {
			move_node(n3, 0, -dy);
		} else {
			move_node(n3, 0, dy);
		}
	}
	
}





function line_vert() {

	//need check if there's a line selected
	if (current_line == -1) {
		return;
	}
	
	//need check if there's only one line selected
	if(line_set.length != 0) {
		return;
	}
	
	//get the node coordinates
	var n1 = objects[scene][current_line].node1;
	var n1x = objects[scene][n1].x;
	var n2 = objects[scene][current_line].node2;
	var n2x = objects[scene][n2].x;
	
	//get the horz center
	var centerX = (n1x + n2x) / 2;
	var dx = Math.abs(n1x - centerX);
	
	if (n1x > centerX) {
		move_node(n1, -dx, 0);
		move_node(n2, dx, 0);
	} else {
		move_node(n1, dx, 0);
		move_node(n2, -dx, 0);
	}
	
	//if it's an arc then move 3rd node
	if (objects[scene][current_line].type == 'arc') {
		var n3 = objects[scene][current_line].node3;
		var n3x = objects[scene][n3].x;
		var dx = Math.abs(n3x - centerX);
		if (n3x > centerX) {
			move_node(n3, -dx, 0);
		} else {
			move_node(n3, dx, 0);
		}
	}
	
}





