

function change_frame(dom) {

	//update previous canvas before moving
	//unless it was just deleted
	if (scene != -1) {
		var oldDOM = $('#frames-container button:eq('+scene+')');
		var canDOM = $(oldDOM).children('canvas');
		data_to_canvas(scene, canDOM);
	}

	//reset
	if (show_state == 'ghost' || show_state == 'hide') {
		show_state = 'hide';
		show_hide_elements();
	}
	buttons(1);
	
	//get which frame this is
	//or new one if nothing passed
	if (!dom) {
		var fid = scene + 1;
	} else {
		var fid = $('.frame-button').index(dom);
	}
	
	//if it's the same as already on then skip
	if (fid == scene) {
		return;
	}

	//highlight this frame
	$('.frame-button').removeClass('current-frame');
	$('#frames-container button div').html('');
	$('#frames-container button:eq('+fid+')').addClass('current-frame');
	$('#frames-container button:eq('+fid+') div').html(fid);

	//set up some variables
	var alpha_step = 1/num_ghost;
	
	//clear the scene
	paper.clear();
	
	//loop through past frames and draw ghost images
	for (var i=1; i<=num_ghost; i++) {

		var gid = fid-i;
		var alpha = ((num_ghost + 1) - i) * alpha_step * 0.25;
		
		if (gid >= 0) {
			draw_ghost(gid, alpha);
		}
	}
	

	//draw this frame
	draw_full(fid);
	
	//update scene
	scene = fid;
}

