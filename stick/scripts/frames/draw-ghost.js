


function draw_ghost(gid, alpha) {

	//loop through all objects from gid frame
	for (var i=0; i<objects[gid].length; i++) {
	
		//if it's a line
		if (objects[gid][i] && objects[gid][i].type == 'line') {
		
			var n1 = objects[gid][i].node1;
			var n1x = objects[gid][n1].x;
			var n1y = objects[gid][n1].y;
			var n2 = objects[gid][i].node2;
			var n2x = objects[gid][n2].x;
			var n2y = objects[gid][n2].y;
			var size = objects[gid][i].size;
			
			if (scale_elements == true) { size *= scale;}
		
			var pathstring = 'M'+n1x+','+n1y+'L'+n2x+','+n2y;
			obj = paper.path(pathstring);
			obj.attr('stroke', 'rgba(0,0,0,'+alpha+')');
			obj.attr('stroke-width', size);
			obj.attr('stroke-linecap', 'round');
			
			//set so some really high ID because we want to
			//restart with 0 again for this frame
			obj.id = (1000000 * (gid+1)) + i;
		}
		
		
		//if it's a circle
		if (objects[gid][i] && objects[gid][i].type == 'circle') {
		
			var n1 = objects[gid][i].node1;
			var n1x = objects[gid][n1].x;
			var n1y = objects[gid][n1].y;
			var n2 = objects[gid][i].node2;
			var n2x = objects[gid][n2].x;
			var n2y = objects[gid][n2].y;
			var size = objects[gid][i].size;
			
			if (scale_elements == true) { size *= scale;}
		
			var centerx = (n1x + n2x) / 2;
			var centery = (n1y + n2y) / 2;
			//calculate radius
			var dx = n1x - n2x;
			var dy = n1y - n2y;
			var dia = Math.pow((dx * dx + dy * dy),0.5);
			var rad = dia / 2;
			//add circle
			obj = paper.circle(centerx, centery, rad);
			obj.attr('stroke', 'rgba(0,0,0,'+alpha+')');
			obj.attr('stroke-width', size);
			
			//set so some really high ID because we want to
			//restart with 0 again for this frame
			obj.id = (1000000 * (gid+1)) + i;
		}
		
		//if it's an arc
		if (objects[gid][i] && objects[gid][i].type == 'arc') {
		
			var n1 = objects[gid][i].node1;
			var n1x = objects[gid][n1].x;
			var n1y = objects[gid][n1].y;
			var n2 = objects[gid][i].node2;
			var n2x = objects[gid][n2].x;
			var n2y = objects[gid][n2].y;
			var n3 = objects[gid][i].node3;
			var n3x = objects[gid][n3].x;
			var n3y = objects[gid][n3].y;
			var size = objects[gid][i].size;
			
			if (scale_elements == true) { size *= scale;}
		
			var pathstring = 'M'+n1x+','+n1y+'S'+n3x+','+n3y+','+n2x+','+n2y;
			obj = paper.path(pathstring);
			obj.attr('stroke', 'rgba(0,0,0,'+alpha+')');
			obj.attr('stroke-width', size);
			obj.attr('stroke-linecap', 'round');
			
			//set so some really high ID because we want to
			//restart with 0 again for this frame
			obj.id = (1000000 * (gid+1)) + i;
		}
		
	}
}