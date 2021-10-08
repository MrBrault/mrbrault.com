function delete_frame_confirm() {

	//don't delete if there's only one
	if (objects.length == 1) {
		alert("Can't delete all frames.");
		return;
	}
	
	
	var r=confirm("Delete Frame?");
	if (r==true) {
		delete_frame()
	}	
}




function delete_frame() {



	//remove frames from bottom
	if (scene == objects.length-1) {
		//option 1: last frame
		$('#frames-container button:eq('+scene+')').remove();
		$('#frames-container img:eq('+(scene-1)+')').remove();
	} else {
		//option 2: middle or first frame
		$('#frames-container button:eq('+scene+')').remove();
		$('#frames-container img:eq('+scene+')').remove();
	}


	//remove data
	objects.splice(scene,1);
	
	
	//go to frame
	if (scene == 0) {
		//option 1: first frame
		var dom = $('#frames-container button:eq('+(scene)+')');
	} else {
		//option 2: middle or first frame
		var dom = $('#frames-container button:eq('+(scene-1)+')');
	}	
	

	//set current (from) scene
	scene = -1;
	
	//make change
	change_frame(dom);

}







