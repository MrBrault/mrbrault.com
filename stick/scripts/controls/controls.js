


function delete_element() {

	//either it's a node or a line

	//option 1: node
	//	nodes will delete all attached lines
	//	any nodes without lines will also be deleted	
	if (current_node != -1) {
		delete_node();
	}
	//option 2: line
	//	lines will leave nodes
	//  any nodes without lines will also be deleted
	//  this works for all elements
	if (current_line != -1) {
		delete_line(current_line);
	}
	
	//show button options
	buttons(1);
	
}





function multi_select() {

	//need check if there's no node selected
	if (current_node == -1) {
		return;
	}

	//add node selection
	node_set = [];
	node_set.push(current_node);

}










