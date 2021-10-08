



function move_button(dir) {

	//option 1: 1 node
	if (current_node != -1 && node_set.length == 0) {
		if (dir == 'left') {
			move_node(current_node, -default_move, 0);
		}
		if (dir == 'up') {
			move_node(current_node, 0, -default_move);
		}
		if (dir == 'down') {
			move_node(current_node, 0, default_move);
		}
		if (dir == 'right') {
			move_node(current_node, default_move, 0);
		}
	}
	
	//option 2: 1 line
	if (current_line != -1 && line_set.length == 0) {
		var n1id = objects[scene][current_line].node1;
		var n2id = objects[scene][current_line].node2;
		if (objects[scene][current_line].type == 'arc') { var n3id = objects[scene][current_line].node3; };
		if (dir == 'left') {
			move_node(n1id, -default_move, 0);
			move_node(n2id, -default_move, 0);
			if (objects[scene][current_line].type == 'arc') { move_node(n3id, -default_move, 0); };
		}
		if (dir == 'up') {
			move_node(n1id, 0, -default_move);
			move_node(n2id, 0, -default_move);
			if (objects[scene][current_line].type == 'arc') { move_node(n3id, 0, -default_move); };
		}
		if (dir == 'down') {
			move_node(n1id, 0, default_move);
			move_node(n2id, 0, default_move);
			if (objects[scene][current_line].type == 'arc') { move_node(n3id, 0, default_move); };
		}
		if (dir == 'right') {
			move_node(n1id, default_move, 0);
			move_node(n2id, default_move, 0);
			if (objects[scene][current_line].type == 'arc') { move_node(n3id, default_move, 0); };
		}
	}
	
	//option 3: line set
	if (line_set.length != 0) {
	
		for (var i=0; i<node_set.length; i++) {
		
			var nid = node_set[i];

			if (dir == 'left') {
				move_node(nid, -default_move, 0);
			}
			if (dir == 'up') {
				move_node(nid, 0, -default_move);
			}
			if (dir == 'down') {
				move_node(nid, 0, default_move);
			}
			if (dir == 'right') {
				move_node(nid, default_move, 0);
			}
		}
	}
}





function moveby(val) {

	$('#moveby-'+default_move+'-button').removeClass('control-button-active');
	$('#moveby-'+val+'-button').addClass('control-button-active');
	default_move = val;
}
