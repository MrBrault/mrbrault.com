




function show_hide_elements() {


	//clean scene and redraw ghosts
	paper.clear();
	var alpha_step = 1/num_ghost;
	
	//loop through past frames and draw ghost images
	for (var i=1; i<=num_ghost; i++) {

		var gid = scene-i;
		var alpha = ((num_ghost + 1) - i) * alpha_step * 0.25;
		
		if (gid >= 0) {
			draw_ghost(gid, alpha);
		}
	}
		
		

	//show ghost image of this frame
	if (show_state == "full") {
	
		show_state = 'ghost';
		$('#show-hide-elements-button img').attr("src", "icons/show-ghost.jpg");
		
		draw_ghost(scene, 0.25);
	}
	
	//remove all frame elements
	else if (show_state == "ghost") {
	
		show_state = 'hide';
		$('#show-hide-elements-button img').attr("src", "icons/hide.jpg");
		
	}
	
	//restore to normal
	else if (show_state == "hide") {
	
		show_state = 'full';
		$('#show-hide-elements-button img').attr("src", "icons/show-full.jpg");
		
		draw_full(scene);
	}
	



}









function show_hide_grid() {
	
	var currentstate = $('#canvas-container').hasClass('canvas-container-back-grid');
	
	if (currentstate == true) {
		$('#canvas-container').removeClass('canvas-container-back-grid');
		$('#canvas-container').addClass('canvas-container-back-none');
		
	} else {
		$('#canvas-container').removeClass('canvas-container-back-none');
		$('#canvas-container').addClass('canvas-container-back-grid');
	}
	

}

















