



function rotate_set(dir) {

	
	//need check if there's a set selected
	if (line_set.length == 0) {
		return
	}
	
	//get rotation step
	var rotdeg = (dir == 1) ? default_move : -default_move;
	
	//get location of center
	var maxX = 0;
	var maxY = 0;
	var minX = 9999;
	var minY = 9999;
	for (var i=0; i<node_set.length; i++) {
		var nid = node_set[i];
		var obj = paper.getById(nid);
		var nx = obj.attr('cx');
		var ny = obj.attr('cy');
		if (nx > maxX) { maxX = nx; }
		if (ny > maxY) { maxY = ny; }
		if (nx < minX) { minX = nx; }
		if (ny < minY) { minY = ny; }
	}
	var cenx = (maxX + minX) / 2;
	var ceny = (maxY + minY) / 2;

	//for each node calculate new x/y
	for (var i=0; i<node_set.length; i++) {
		var nid = node_set[i];
		var obj = paper.getById(nid);
		var nx = obj.attr('cx');
		var ny = obj.attr('cy');
		//check if it is the pivot
		if (nx == cenx && ny == ceny) { continue; }
		//get deltas from pivot
		var dx = nx - cenx;
		var dy = ny - ceny;
		//adjust for opposite Y axis
		var dyneg = -dy;
		//get arm length
		var arm = Math.pow((dx * dx + dy * dy),0.5);
		//get current angle
		var ang = Math.atan(dyneg / dx);
		//convert to degrees (cause I'm stupid at radians)
		ang = ang * 180 / Math.PI;
		//adjust for quadrants
		if (dx == 0 && dy < 0) { ang = 90; }
		if (dx < 0 && dy < 0) { ang = 180+ang; }
		if (dx < 0 && dy == 0) { ang = 180; }
		if (dx < 0 && dy > 0) { ang = 180+ang; }
		if (dx == 0 && dy > 0) { ang = 270; }
		if (dx > 0 && dy > 0) { ang = 360+ang; }		
		//add rotation
		ang += rotdeg;
		//convert back to rad
		ang = ang / 180 * Math.PI;
		//get new dx/dy
		var newdx = arm * Math.cos(ang);
		var newdy = arm * Math.sin(ang);
		//get node dx/dy
		ndx = newdx - dx;
		ndy = newdy - dyneg;
		//reverse Y
		ndy = -ndy;
		//update node
		move_node(nid, ndx, ndy);
		
	
	}







}







