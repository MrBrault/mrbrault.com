



function add_arc() {

	//need check if there's a node selected
	if (current_node == -1) {
		return;
	}

	//get existing node location for start of line
	var obj = paper.getById(current_node);
	var n1x = obj.attr('cx');
	var n1y = obj.attr('cy');
	
	//get default end of line
	var n2x = n1x + line_default_length;
	var n2y = n1y;
	
	//get center node
	var n3x = n1x + line_default_length/2;
	var n3y = n1y;
	
	//save node for z-index reorder
	var n1 = obj;

	
	//create new node for line end
	obj = paper.circle(n2x, n2y, node_size);
	obj.attr('fill', node_color);
	obj.attr('stroke', node_edge_color);
	obj.attr('stroke-width', node_edge_size);
	//node functions
	obj.drag(drag_node, click_node);
	
	//get id for array
	var n2id = objects[scene].length;
	obj.id = n2id;
	objects[scene][n2id] = {'type':'node', 'lines':[], 'x': n2x, 'y': n2y};	
	
	//create new node for line center
	obj = paper.circle(n3x, n3y, node_size);
	obj.attr('fill', node_color);
	obj.attr('stroke', node_edge_color);
	obj.attr('stroke-width', node_edge_size);
	//node functions
	obj.drag(drag_node, click_node);
	
	//get id for array
	var n3id = objects[scene].length;
	obj.id = n3id;
	objects[scene][n3id] = {'type':'node', 'lines':[], 'x': n3x, 'y': n3y};	


	//add line
	var pathstring = 'M'+n1x+','+n1y+'S'+n3x+','+n3y+','+n2x+','+n2y;
	obj = paper.path(pathstring);
	obj.attr('stroke', line_color);
	obj.attr('stroke-width', line_size);
	obj.attr('stroke-linecap', 'round');
	//line functions
	obj.drag(drag_arc, click_arc);
	obj.dblclick(select_line_set);

	//get id for array
	var lid = objects[scene].length;
	obj.id = lid;
	objects[scene][lid] = {'type':'arc', 'node1':0, 'node2':0, 'node3':0, 'size': line_size, 'color': line_color};
	
	//update array items
	objects[scene][current_node].lines.push(lid);
	objects[scene][n2id].lines.push(lid);
	objects[scene][n3id].lines.push(lid);
	objects[scene][lid].node1 = current_node;
	objects[scene][lid].node2 = n2id;
	objects[scene][lid].node3 = n3id;

	//relayer line over nodes.
	obj.insertBefore(n1);
	
	//reset any selections
	//has to go at end cause otherwise it resets the current_node value
	canvas_reset();

}




