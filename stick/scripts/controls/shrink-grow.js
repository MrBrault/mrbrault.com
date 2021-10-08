



function grow_set(dir) {

	//need check if there's a set selected
	if (line_set.length == 0) {
		return
	}
	
	//get grow or shrink directions
	var grow_shrink = (dir == 1) ? default_move : -default_move;
	
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
	
	//get overall size for scaling
	var dxmax = maxX-minX;
	var dymax = maxY-minY;
	var maxdelta = Math.max(dxmax,dymax);
	maxdelta = maxdelta / 2;


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
		//scale
		scalex = dx / maxdelta;
		scaley = dy / maxdelta;
		//new x/y
		var ndx =  grow_shrink * scalex;
		var ndy =  grow_shrink * scaley;
		//update node
		move_node(nid, ndx, ndy);
		
	
	}
	

}




