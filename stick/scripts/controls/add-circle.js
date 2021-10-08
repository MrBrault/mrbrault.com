



function add_circle() {

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

	//add circle
	var centerx = (n1x + n2x) / 2;
	var centery = (n1y + n2y) / 2;

	obj = paper.circle(centerx, centery, line_default_length / 2);
	obj.attr('stroke', line_color);
	obj.attr('stroke-width', line_size);
	//line functions
	obj.drag(drag_circle, click_circle);
	obj.dblclick(select_line_set);

	//get id for array
	var lid = objects[scene].length;
	obj.id = lid;
	objects[scene][lid] = {'type':'circle', 'node1':0, 'node2':0 , 'size': line_size, 'color': line_color};
	
	//update array items
	objects[scene][current_node].lines.push(lid);
	objects[scene][n2id].lines.push(lid);
	objects[scene][lid].node1 = current_node;
	objects[scene][lid].node2 = n2id;

	//relayer line over nodes.
	obj.insertBefore(n1);
	
	//reset any selections
	//has to go at end cause otherwise it resets the current_node value
	canvas_reset();

}




