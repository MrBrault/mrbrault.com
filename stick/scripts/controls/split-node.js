



function split_node() {

	//need check if there's no node selected
	if (current_node == -1) {
		return;
	}
	
	//need to check if theree's at least 2 lines
	if (objects[scene][current_node].lines.length < 2) {
		return;
	}
	
	//get existing node location for location
	var obj = paper.getById(current_node);
	var x = obj.attr('cx');
	var y = obj.attr('cy');
	
	//loop through lines and create new nodes (except first one)
	for (var i=1; i<objects[scene][current_node].lines.length; i++) {

		//create new node
		var obj = paper.circle(x, y, node_size);
		obj.attr('fill', node_color);
		obj.attr('stroke', node_edge_color);
		obj.attr('stroke-width', node_edge_size);
		//node functions
		obj.drag(drag_node, click_node);
		
		//get id for array
		var nid = obj.id;
		objects[scene][nid] = {'type':'node', 'lines':[]};
		
		//add line to this node's line array
		var lid = objects[scene][current_node].lines[i];
		objects[scene][nid].lines.push(lid);
		
		//attach new node to line's node list
		//need to find out which side current (old) one was on
		var n1id = objects[scene][lid].node1;
		var n2id = objects[scene][lid].node2;
		var lside = (current_node == n1id) ? 0 : 1;

		if (lside == 0) { objects[scene][lid].node1 = nid; }
		if (lside == 1) { objects[scene][lid].node2 = nid; }
				
	}
	
	//now remove all lines from current node except first one
	var lid = objects[scene][current_node].lines[0]
	objects[scene][current_node].lines = [lid];

}










