



//this function provides the dx/dy during drag
//this is the same as the node drag but it's tied to a line object
function drag_arc(dx, dy, x, y){

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
	var n3id = objects[scene][lid].node3;
	
	//move nodes
	move_node(n1id, trueDx, trueDy);
	move_node(n2id, trueDx, trueDy);
	move_node(n3id, trueDx, trueDy);

};




//this function does the actual moving for a given x,y coordinate
//no dx/dy needed because we're matching the node location (passed x,y)
function move_arc(lid, nid, x, y) {
	
	//get which end this node belongs to
	var n1id = objects[scene][lid].node1;
	var n2id = objects[scene][lid].node2;
	var n3id = objects[scene][lid].node3;
	
	//get line object
	var obj = paper.getById(lid);
	
	//update path data
	if(nid == n1id) {
		var pathArray = obj.attr('path');
		pathArray[0][1] = x;
		pathArray[0][2] = y;
	}
	if(nid == n2id) {
		var pathArray = obj.attr('path');
		pathArray[1][3] = x;
		pathArray[1][4] = y;
	}
	if(nid == n3id) {
		var pathArray = obj.attr('path');
		pathArray[1][1] = x;
		pathArray[1][2] = y;
	}

	//update line
	obj.attr({path: pathArray});
	
}








