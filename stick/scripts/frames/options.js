


function show_frame_options(dom) {

	//get which frame this option belongs to
	var fid = $('#frames-container img').index(dom);
	frame_options = fid;

	//get it's options
	var steps = objects[fid].options.steps;
	
	//fill in values
	$('#frame-options-steps').val(steps);
	if (steps == 'D') {
		$('#frame-options-steps-slider').val(-1);
	} else {
		$('#frame-options-steps-slider').val(steps);
	}
	
	//show form
	$('#frame-options-div').removeClass('hidden');
}







function frame_options_slider_change() {

	var value = $('#frame-options-steps-slider').val();
	if (value == -1) {
		value = 'D';
	}
	$('#frame-options-steps').val(value);

}





function close_frame_options(opt) {

	if (opt == 'ok') {
		var value = $('#frame-options-steps').val();
		objects[frame_options].options.steps = value;
	}

	$('#frame-options-div').addClass('hidden');
}




