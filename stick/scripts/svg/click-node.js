

function click_node(x, y, e) {

	//can have two choices
	//1. just one node to move
	//2. or multiple to join
	
	//$('#debug').html(this.id);
	
	//if there's a line_set then clear
	if (line_set.length != 0) { node_set = []; }
	
	//if ctrl key is down then start multi-select
	//start by adding current node to set
	if (e.ctrlKey) {
		if (current_node != -1) {
			node_set.push(current_node);
		}
	}	
	
	//else just a click
	if(node_set.length == 0) {
	
		//reset all
		canvas_reset();
		
		//add glow to this node
		this.attr('fill', node_glow_color);
		this.attr('stroke', node_glow_edge_color);
		this.attr('stroke-width', node_glow_edge_size);		

		//get mouse starting location in case of move
		startX = x;
		startY = y;
		
		//save ID in case of adding line
		current_node = this.id;
		
		//show button options
		buttons(2);
	
	}
	
	
	//else multi-select button has been pressed
	if(node_set.length != 0) {
	
		nid = this.id;
	
		//check if it's already in the set
		var isinset = arrayLocation(node_set,nid);
		if (isinset == null) {
		
			//push this node to the set
			node_set.push(nid);
			//add more glows
			this.attr('fill', node_glow_color);
			this.attr('stroke', node_glow_edge_color);
			this.attr('stroke-width', node_glow_edge_size);	
		}
		
		//get mouse starting location in case of move
		startX = x;
		startY = y;
		
		//save ID in case of moving
		current_node = this.id;
		
		//show button options
		buttons(3);
	}
	
	
	
};








