


function global_options() {


	//fill in values
	$('#global-options-fr-slider').val(frame_rate);
	$('#global-options-fr').val(frame_rate);
	
	$('#global-options-steps-slider').val(default_steps);
	$('#global-options-steps').val(default_steps);
	
	//show form
	$('#global-options-div').removeClass('hidden');
}







function global_fr_slider_change() {

	var value = $('#global-options-fr-slider').val();
	$('#global-options-fr').val(value);

}

function global_fr_text_change() {

	var value = $('#global-options-fr').val();
	$('#global-options-fr-slider').val(value);

}

function global_steps_slider_change() {

	var value = $('#global-options-steps-slider').val();
	$('#global-options-steps').val(value);

}

function global_ghosts_slider_change() {

	var value = $('#global-options-ghosts-slider').val();
	$('#global-options-ghosts').val(value);

}

function global_node_size_slider_change() {

	var value = $('#global-options-node-size-slider').val();
	$('#global-options-node-size').val(value);

}


function global_zoom(id) {

	if (id == 1) {
		scale_elements = true;
		$('#global-zoom-yes').addClass('save-button-active');
		$('#global-zoom-no').removeClass('save-button-active');
	}
	
	if (id == 0) {
		scale_elements = false;
		$('#global-zoom-yes').removeClass('save-button-active');
		$('#global-zoom-no').addClass('save-button-active');
	}	

}





function close_global_options(opt) {

	if (opt == 'ok') {
		frame_rate = parseInt($('#global-options-fr-slider').val());
		if (frame_rate > 500) { frame_rate = 500; }
		if (frame_rate < 1) { frame_rate = 1; }
		default_steps = parseInt($('#global-options-steps-slider').val());
		num_ghost = parseInt($('#global-options-ghosts-slider').val());
		node_size = parseInt($('#global-options-node-size-slider').val());
	}
	
	$('#global-options-div').addClass('hidden');
	
	//redraw
	buttons(1);
	paper.clear();
	
	//loop through past frames and draw ghost images
	var alpha_step = 1/num_ghost;
	for (var i=1; i<=num_ghost; i++) {
		var gid = scene-i;
		var alpha = ((num_ghost + 1) - i) * alpha_step * 0.25;
		if (gid >= 0) { draw_ghost(gid, alpha); }
	}
	
	//draw this frame
	draw_full(scene);
}




