




function click_arc(x, y, e){

	//can have three choices
	//1. click on an unselected line - clears all selected
	//2. hold CTRL - add to line set
	//3. click on selected lineset - move
	
	
	var lid = this.id
	
	//check for option 1 - not in lineset and no CTRL button
	var isinset = arrayLocation(line_set,lid);
	if (isinset == null && !e.ctrlKey) {
	
		//reset all
		canvas_reset();
		
		//add glow to this node
		this.attr('stroke', line_glow_color);
		var size = objects[scene][this.id].size;
		if (scale_elements == true) { size *= scale; }
		this.attr('stroke-width', size);
		
		//add glow to it's nodes as well
		var nodes = [];
		nodes[0] = objects[scene][lid].node1;
		nodes[1] = objects[scene][lid].node2;
		nodes[2] = objects[scene][lid].node3;
		for (var j=0; j<nodes.length; j++) {
			var obj = paper.getById(nodes[j]);
			obj.attr('fill', node_line_select_glow_color);
			obj.attr('stroke', node_glow_edge_color);
			obj.attr('stroke-width', node_glow_edge_size);
		}
	
		//get mouse starting location in case of move
		startX = x;
		startY = y;
		
		//save ID
		current_line = lid;
		
		//show button options
		buttons(4);
		
		return;
	}
	
	
	//check for option 2 - CRTL button
	if (e.ctrlKey && current_line != -1) {
	
		//add first line
		if (line_set.length == 0) {
			line_set.push(current_line);
			//push nodes into set
			var nodes = [];
			nodes[0] = objects[scene][current_line].node1;
			nodes[1] = objects[scene][current_line].node2;
			if (objects[scene][current_line].type == 'arc') { nodes[2] = objects[scene][current_line].node3; };
			//loop through nodes
			for (var j=0; j<nodes.length; j++) {
				var nid = nodes[j];
				node_set.push(nid);
			}
			//remove glow to it's nodes
			for (var j=0; j<nodes.length; j++) {
				var obj = paper.getById(nodes[j]);
				obj.attr('fill', node_color);
				obj.attr('stroke', node_edge_color);
				obj.attr('stroke-width', node_edge_size);
			}
		}
	
		//add to lineset
		var isinset = arrayLocation(line_set,lid);
		if (isinset == null) {
		
			//push this line to the set
			line_set.push(lid);
			
			//add line glows
			this.attr('stroke', line_glow_color);
			var size = objects[scene][this.id].size;
			if (scale_elements == true) { size *= scale; }
			this.attr('stroke-width', size);
			
			//push nodes into set
			var nodes = [];
			nodes[0] = objects[scene][lid].node1;
			nodes[1] = objects[scene][lid].node2;
			if (objects[scene][lid].type == 'arc') { nodes[2] = objects[scene][lid].node3; };
			//loop through nodes
			for (var j=0; j<nodes.length; j++) {
				var nid = nodes[j];
				//check if it's already in the set
				var index = arrayLocation(node_set,nid);
				if (index == null) {
					node_set.push(nid);
				}
			}
		}
		
		//show button options
		buttons(5);		
		
		return;
	}
	
	
	//check for option 3 - lineset selected but clicking to move
	if(line_set.length != 0) {

		//get mouse starting location in case of move
		startX = x;
		startY = y;	
	
	}

	
	
	
	
	
	
	

	
	

};