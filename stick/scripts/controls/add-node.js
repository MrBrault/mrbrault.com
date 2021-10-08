



function add_node() {

	//reset any selections
	canvas_reset();
	
	//get location to put new node (center)
	var canvas = $("#canvas-container");
	//var x = canvas.width() / 2;
	//var y = canvas.height() / 2;
	//put on grid intersection
	var x = 334;
	var y = 182;
	
	//create new node
	var obj = paper.circle(x, y, node_size);
	obj.attr('fill', node_color);
	obj.attr('stroke', node_edge_color);
	obj.attr('stroke-width', node_edge_size);
	//node functions
	obj.drag(drag_node, click_node);
	
	//set id for array (next number)
	var id = objects[scene].length;
	obj.id = id;
	objects[scene][id] = {'type':'node', 'lines':[], 'x': x, 'y': y};
	
	
	//by default it's seleted
	
	//add glow to this node
	obj.attr('fill', node_glow_color);
	obj.attr('stroke', node_glow_edge_color);
	obj.attr('stroke-width', node_glow_edge_size);		

	//save ID
	current_node = obj.id;

	//show button options
	buttons(2);
	

}







