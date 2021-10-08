function setup_play_local_controls() {

	//this is only called when we open up the player

	//get control sizes
	var totalwidth = $('#play-slider').width();
	var startwidth = $('#play-start-frame').width();
	leftoffset = startwidth;
	currentwidth = $('#play-current-frame').width();

	//calculate step size
	var availablewidth = totalwidth - 2 * startwidth;
	control_stepsize = availablewidth / local_index;

	//set up stop frame index if first time
	if (local_controls[1] == 0) { local_controls[1] = local_index; }
	//or if number of frames was reduced
	if (local_controls[1] > local_index)  { local_controls[1] = local_index; }
	//current is reset to start
	local_controls[2] = local_controls[0];
	
	//set up locations
	var startleft = local_controls[0] * control_stepsize + leftoffset - startwidth;
	var endleft = local_controls[1] * control_stepsize + leftoffset;
	var currentcen = local_controls[2] * control_stepsize + leftoffset - currentwidth / 2;
	
	//set up elements
	$('#play-start-frame').css('left',startleft+'px');
	$('#play-stop-frame').css('left',endleft+'px');
	$('#play-current-frame').css('left',currentcen+'px');

	//add listeners
	$('#play-drag-frame').on('mousemove', listen_play_controls);
	$('#play-drag-frame').on('mousedown', start_play_controls);
	
}





function listen_play_controls(e) {
	
	var x = e.offsetX;
	
	//set up areas
	var plusminus = 10;
	var startleft = local_controls[0] * control_stepsize + leftoffset - leftoffset;
	var startright = local_controls[0] * control_stepsize + leftoffset;
	var currentleft = local_controls[2] * control_stepsize + leftoffset - currentwidth / 2;
	var currentright = local_controls[2] * control_stepsize + leftoffset + currentwidth / 2;
	var stopleft = local_controls[1] * control_stepsize + leftoffset;
	var stopright = local_controls[1] * control_stepsize + leftoffset + leftoffset;
	
	//get dom ready for click
	if (x > startleft && x < startright) {
		$('#play-drag-frame').css('cursor','col-resize');
		local_controls[3] = 'start';
	}
	else if (x > stopleft && x < stopright) {
		$('#play-drag-frame').css('cursor','col-resize');
		local_controls[3] = 'stop';
	}
	else if (x > currentleft && x < currentright) {
		$('#play-drag-frame').css('cursor','col-resize');
		local_controls[3] = 'current';
	}
	else {
		$('#play-drag-frame').css('cursor','default');
		local_controls[3] = '';
	}
	
}





function start_play_controls() {
	
	if (local_controls[3] == '') { return; }
	
	//listen to move or mouseup
	$('#play-drag-frame').off('mousemove');
	$('#play-drag-frame').on('mousemove', move_play_controls);
	$('#play-drag-frame').on('mouseup', stop_play_controls);
	$('#play-drag-frame').on('mouseout', stop_play_controls);
	
}





function move_play_controls(e) {

	var x = e.offsetX;
	
	//snap to frames
	var closest_index = 0;
	var closest_dist = 999;
	for (var i=0; i<=local_index; i++) {
		var snap = control_stepsize * i + leftoffset;
		var dist = Math.abs(snap - x);
		if (dist < closest_dist) {
			closest_dist = dist;
			closest_index = i;
		}
	}
	var loc = closest_index * control_stepsize + leftoffset;
	
	
	
	//checks
	if (local_controls[3] == 'start' && local_controls[0] == closest_index) { return; }	//no change
	if (local_controls[3] == 'stop' && local_controls[1] == closest_index) { return; }	//no change
	if (local_controls[3] == 'current' && local_controls[2] == closest_index) { return; }	//no change
	
	if (local_controls[3] == 'start' && closest_index >= local_controls[1]) { return; }	//start can't cross stop
	if (local_controls[3] == 'stop' && closest_index <= local_controls[0]) { return; }	//stop can't cross start
	
	//element offset
	var offset = 0;
	if (local_controls[3] == 'start') { offset = leftoffset; }
	if (local_controls[3] == 'current') { offset = currentwidth / 2; }

	
	
	//move element
	$('#play-'+local_controls[3]+'-frame').css('left',(loc - offset)+'px');
	
	//save data
	if (local_controls[3] == 'start') {local_controls[0] = closest_index; }
	if (local_controls[3] == 'stop') {local_controls[1] = closest_index; }
	if (local_controls[3] == 'current') {local_controls[2] = closest_index; }

	//check if pushing current
	if (local_controls[3] == 'start' && local_controls[0] > local_controls[2]) {
		local_controls[2] = closest_index;
		offset = currentwidth / 2;
		$('#play-current-frame').css('left',(loc - offset)+'px');
	}
	if (local_controls[3] == 'stop' && local_controls[1] < local_controls[2]) {
		local_controls[2] = closest_index;
		offset = currentwidth / 2;
		$('#play-current-frame').css('left',(loc - offset)+'px');
	}
	
	//update frame
	$('.canvas-copy').addClass('hidden');
	$('#canvas-copy-'+local_controls[2]).removeClass('hidden');
	
}





function stop_play_controls() {

	//revert listeners
	$('#play-drag-frame').off('mousemove');
	$('#play-drag-frame').on('mousemove', listen_play_controls);
	$('#play-drag-frame').off('mouseup');
	$('#play-drag-frame').off('mouseout');
	
}




	
	