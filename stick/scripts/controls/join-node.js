



function join_nodes() {

	//check if there's multi-select
	if (node_set.length == 0) {
		return;
	}
	
	//all nodes will take id and location of first one in the set
	var new_id = node_set[0];
	var obj = paper.getById(new_id);
	var new_x = obj.attr('cx');
	var new_y = obj.attr('cy');
	
	//loop through list of nodes
	for (var i=1; i<node_set.length; i++) {
		
		//remove
		var nid = node_set[i];
		obj = paper.getById(nid);
		obj.remove();
		
		//update all lines attached to this node
		for (var j=0; j<objects[scene][nid].lines.length; j++) {
		
			//get line data
			var lid = objects[scene][nid].lines[j];
			
			//find out which node is selected
			var n1id = objects[scene][lid].node1;
			var n2id = objects[scene][lid].node2;
			var lside = (nid == n1id) ? 0 : 1;
			
			//check if both nodes are selected
			if ((n1id == new_id && n2id == nid) || (n1id == nid && n2id == new_id)) {
				//both node are selected so delete line
				obj = paper.getById(lid);
				obj.remove();
				//remove from array
				objects[scene][lid] = null;
				//remove from node's line list (first node in node_set)
				var index = arrayLocation(objects[scene][new_id].lines, lid);
				objects[scene][new_id].lines.splice(index, 1);
				
			} else {
				//ok, only 1 is selected
				
				//update coords
				obj = paper.getById(lid);
				//get the path data
				var pathArray = obj.attr('path');
				//update path data
				pathArray[lside][1] = new_x;
				pathArray[lside][2] = new_y;
				//update line
				obj.attr({path: pathArray});
				
				//update array data
				if (lside == 0) { objects[scene][lid].node1 = new_id; }
				if (lside == 1) { objects[scene][lid].node2 = new_id; }
				
				//push this line into node's line list (first node in node_set)
				objects[scene][new_id].lines.push(lid);
			}
		}
		
		//remove node from array (now that we looped through it's lines)
		objects[scene][nid] = null;
	}
	
	//reset
	canvas_reset();

}