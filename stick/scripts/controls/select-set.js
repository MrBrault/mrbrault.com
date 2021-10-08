



function select_line_set() {

	//check if there's a current line
	if (current_line == -1) {
		return;
	}
	
	//reset glows
	unglow_all();

	//get all other lines
	get_lines(current_line);
	
	//glow all lines in the set
	for (var i=0; i<line_set.length; i++) {
		//add glow to this line
		var lid = line_set[i];
		var obj = paper.getById(lid);
		obj.attr('stroke', line_glow_color);
		var size = objects[scene][lid].size;
		obj.attr('stroke-width', size);
	}
	
		
	//show button options
	buttons(5);
	
}





function get_lines(lid) {

	//add this line to the set
	line_set.push(lid);
	
	//get nodes for this line (start node)
	var nodes = [];
	nodes[0] = objects[scene][lid].node1;
	nodes[1] = objects[scene][lid].node2;
	if (objects[scene][lid].type == 'arc') { nodes[2] = objects[scene][lid].node3; };
	
	//loop for both nodes
	for (var j=0; j<nodes.length; j++) {
	
		var nid = nodes[j];
	
		//check if it's already in the set
		var index = arrayLocation(node_set,nid);
		
		//if no match then add it and get those lines
		if (index == null) {
			node_set.push(nid);
			
			//get this node's lines
			for (var i=0; i<objects[scene][nid].lines.length; i++) {
			
				//check if it's already in the set
				var sublid = objects[scene][nid].lines[i];
				var index2 = arrayLocation(line_set,sublid);
				
				if (index2 == null) {
					//if no match then arun this again
					//and keep adding nodes and lines to set
					//if not already there
					get_lines(sublid);
				}
				
			}
			
		}
		
	}

}



