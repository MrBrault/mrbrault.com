



function draw_full(fid) {

	//loop through all objects from this frame
	//first draw lines then put nodes on top
	
	for (var i=0; i<objects[fid].length; i++) {
		//first draw lines
		if (objects[fid][i] && objects[fid][i].type == 'line') {
		
			var n1 = objects[fid][i].node1;
			var n1x = objects[fid][n1].x;
			var n1y = objects[fid][n1].y;
			var n2 = objects[fid][i].node2;
			var n2x = objects[fid][n2].x;
			var n2y = objects[fid][n2].y;
			var size = objects[fid][i].size;
			var color = objects[fid][i].color;
			
			if (scale_elements == true) { size *= scale;}
		
			//add line
			var pathstring = 'M'+n1x+','+n1y+'L'+n2x+','+n2y;
			obj = paper.path(pathstring);
			obj.attr('stroke', color);
			obj.attr('stroke-width', size);
			obj.attr('stroke-linecap', 'round');
			//line functions
			obj.drag(drag_line, click_line);
			obj.dblclick(select_line_set);
			//set paper id back to what's stored in the data array
			obj.id = i;
		}
		//and circles
		if (objects[fid][i] && objects[fid][i].type == 'circle') {
		
			var n1 = objects[fid][i].node1;
			var n1x = objects[fid][n1].x;
			var n1y = objects[fid][n1].y;
			var n2 = objects[fid][i].node2;
			var n2x = objects[fid][n2].x;
			var n2y = objects[fid][n2].y;
			var size = objects[fid][i].size;
			var color = objects[fid][i].color;
			
			if (scale_elements == true) { size *= scale;}
		
			//add circle
			var centerx = (n1x + n2x) / 2;
			var centery = (n1y + n2y) / 2;
			//calculate radius
			var dx = n1x - n2x;
			var dy = n1y - n2y;
			var dia = Math.pow((dx * dx + dy * dy),0.5);
			var rad = dia / 2;
			obj = paper.circle(centerx, centery, rad);
			obj.attr('stroke', color);
			obj.attr('stroke-width', size);
			//line functions
			obj.drag(drag_circle, click_circle);
			obj.dblclick(select_line_set);
			//set paper id back to what's stored in the data array
			obj.id = i;
		}
		//and arcs
		if (objects[fid][i] && objects[fid][i].type == 'arc') {
		
			var n1 = objects[fid][i].node1;
			var n1x = objects[fid][n1].x;
			var n1y = objects[fid][n1].y;
			var n2 = objects[fid][i].node2;
			var n2x = objects[fid][n2].x;
			var n2y = objects[fid][n2].y;
			var n3 = objects[fid][i].node3;
			var n3x = objects[fid][n3].x;
			var n3y = objects[fid][n3].y;
			var size = objects[fid][i].size;
			var color = objects[fid][i].color;
			
			if (scale_elements == true) { size *= scale; }
		
			//add line
			var pathstring = 'M'+n1x+','+n1y+'S'+n3x+','+n3y+','+n2x+','+n2y;
			obj = paper.path(pathstring);
			obj.attr('stroke', color);
			obj.attr('stroke-width', size);
			obj.attr('stroke-linecap', 'round');
			//line functions
			obj.drag(drag_arc, click_arc);
			obj.dblclick(select_line_set);
			//set paper id back to what's stored in the data array
			obj.id = i;
		}
	}
	
	
	for (var i=0; i<objects[fid].length; i++) {
		//then draw nodes
		if (objects[fid][i] && objects[fid][i].type == 'node') {
		
			var x = objects[fid][i].x;
			var y = objects[fid][i].y;
			var size = node_size;
			
			//for whatever reason the node resizes opposite of the lines
			if (scale_elements == false) { size = size / scale; }
			
			var obj = paper.circle(x, y, size);
			obj.attr('fill', node_color);
			obj.attr('stroke', node_edge_color);
			obj.attr('stroke-width', node_edge_size);
			//node functions
			obj.drag(drag_node, click_node);
			//set paper id back to what's stored in the data array
			obj.id = i;
			
		}
	}

}