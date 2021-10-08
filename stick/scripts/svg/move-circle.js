



//this function provides the dx/dy during drag
//this is the same as the node drag but it's tied to a line object
function drag_circle(dx, dy, x, y){

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
	
	//otherwise just move one line (2 nodes)s
	
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
function move_circle(lid, nid, x, y) {
	
	//get which end this node belongs to
	var n1id = objects[scene][lid].node1;
	var n2id = objects[scene][lid].node2;
	var lside = (nid == n1id) ? 0 : 1;
	
	//get other node's location
	if (lside == 0) { var obj = paper.getById(n2id); }
	if (lside == 1) { var obj = paper.getById(n1id); }
	var otherx = obj.attr('cx');
	var othery = obj.attr('cy');
	
	//calculate center of circle
	var centerx = (x + otherx) / 2;
	var centery = (y + othery) / 2;
	
	//calculate radius
	var dx = x - otherx;
	var dy = y - othery;
	var dia = Math.pow((dx * dx + dy * dy),0.5);
	var rad = dia / 2;
	
	//get circle object
	var obj = paper.getById(lid);
	
	//update circle
	obj.attr({cx:centerx, cy:centery, r:rad});
	
}








