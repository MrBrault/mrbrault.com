



function delete_line(lid) {

	//remove line from DOM
	var obj = paper.getById(lid);
	obj.remove();

	//get nodes for this line
	var n1id = objects[scene][lid].node1;
	var n2id = objects[scene][lid].node2;
	
	//check if each node has any other lines attached
	//cound probably loop this instead of copying the code
	//but it's just easier this way
	
	if (objects[scene][n1id].lines.length == 1) {
		//no more lines so delete
		obj = paper.getById(n1id);
		obj.remove();
		//remove node from array
		objects[scene][n1id] = null;
	} else {
		//other lines so just remove from array but keep node
		var index = arrayLocation(objects[scene][n1id].lines, lid);
		//remove it
		objects[scene][n1id].lines.splice(index, 1);	
	}
	

	if (objects[scene][n2id].lines.length == 1) {
		//no more lines so delete
		obj = paper.getById(n2id);
		obj.remove();
		//remove node from array
		objects[scene][n2id] = null;
	} else {
		//other lines so just remove from array but keep node
		var index = arrayLocation(objects[scene][n2id].lines, lid);
		//remove it
		objects[scene][n2id].lines.splice(index, 1);	
	}
	
	
	//check for 3rd node on arc
	var type = objects[scene][lid].type;
	if (type == 'arc') {
		
		var n3id = objects[scene][lid].node3;
		if (objects[scene][n3id].lines.length == 1) {
			//no more lines so delete
			obj = paper.getById(n3id);
			obj.remove();
			//remove node from array
			objects[scene][n3id] = null;
		} else {
			//other lines so just remove from array but keep node
			var index = arrayLocation(objects[scene][n3id].lines, lid);
			//remove it
			objects[scene][n3id].lines.splice(index, 1);	
		}	
	}
	
	
	//remove line from array
	objects[scene][lid] = null;
	
	//array maintenance
	//remove trailing null values
	for (var i=objects[scene].length-1; i>0; i--) {
		if (objects[scene][i] == null) {
			objects[scene].splice(i, 1);
		} else {
			break;
		}
	}
	
	

	//reset
	current_line = -1;

}


