



function move_set(dx, dy) {

	//since we have a function that moves nodes using a true DX/DY
	//and that function will update all lines connected to that node
	//we just have to call that function for all nodes in this set
	
	for (var i=0; i<node_set.length; i++) {
	
		var nid = node_set[i];
		move_node(nid, dx, dy);

	}

}




