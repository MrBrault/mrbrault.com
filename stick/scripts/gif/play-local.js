
function play_local() {

	//this is called when opening up the player
	//maybe some frames have changed so we rerun the frames

	//show canvas
	$('#canvas-copy-div').removeClass('hidden');
	
	//reset layout
	buttons(1);
	
	//start total frame index
	local_index = 0;
	
	//start looping through frames
	for (var i=0; i<objects.length-1; i++) {
		calc_intermediate_frames(i);
	}
	
	//create canvas
	var child = "<canvas id='canvas-copy-"+local_index+"' class='canvas-copy hidden' width=640px height=360px></canvas>";
	$('.canvas-copy-container').append(child);

	//draw last frame
	var canDOM = $('#canvas-copy-'+local_index);
	var canvas = canDOM[0];
	var ctx = canvas.getContext("2d");
	data_to_canvas(objects.length-1, canDOM);
	
	//setup controls
	setup_play_local_controls();
	
	//play it
	play_local_frames_start(local_controls[0]);
}



function play_local_frames_start(findex) {

	//this is called after first opeining
	//AND when already open - which we don't need to redraw the frames or reset the controls
	//we just need to hide all frames and start again

	$('.canvas-copy').addClass('hidden');
	play_local_frames(findex);
}



function play_local_frames(findex) {

	//this is called over and over again with findex incrementing

	//move indicator
	var loc = findex * control_stepsize + leftoffset;
	offset = currentwidth / 2;
	$('#play-current-frame').css('left',(loc - offset)+'px');
	local_controls[2] = findex;
	
	//show frame
	$('#canvas-copy-'+findex).removeClass('hidden');
	
	//refresh hack
	sel = document.getElementById('canvas-copy-'+findex);
	sel.style.display='none';
	sel.style.display='block';
	
	//loop
	findex++;
	if (findex <= local_controls[1]) {
		$('#canvas-copy-'+(findex-1)).addClass('hidden');
		window.setTimeout("play_local_frames("+findex+");",frame_rate);
	} else {
		//clear refresh hack
		$('.canvas-copy').attr('style','');
	}
}





function calc_intermediate_frames(fid) {
	
	
	//get number of steps for this frame
	steps = objects[fid].options.steps;
	steps = (steps == 'D') ? default_steps : parseInt(steps);

	//loop through nodes and calculate the delta and save
	deltas = [];
	for (var i=0; i<objects[fid].length; i++) {
		if (objects[fid][i] && objects[fid][i].type == 'node') {
			
			//this node
			var x1 = objects[fid][i].x;
			var y1 = objects[fid][i].y;
			//this node from next frame (if available)
			if (objects[fid+1][i] != null) {
				var x2 = objects[fid+1][i].x;
				var y2 = objects[fid+1][i].y;
			} else {
				var x2 = x1;
				var y2 = y1;
			}

			var totalx = x2 - x1;
			var totaly = y2 - y1;
			
			deltas[i] = {'x': (totalx / (steps + 1)), 'y': (totaly / (steps + 1))};
		}
	}

	//loop through lines and calculate the line size delta
	deltas_ls = [];
	for (var i=0; i<objects[fid].length; i++) {
		if (objects[fid][i] && objects[fid][i].type != 'node') {
			
			//this line
			var ls1 = objects[fid][i].size;
			//this line from next frame (if available)
			if (objects[fid+1][i] != null) {
				var ls2 = objects[fid+1][i].size;
			} else {
				var ls2 = ls1;
			}
			var totalls = ls2 - ls1;		
			deltas_ls[i] = {'size': (totalls / (steps + 1))};
		}
	}
	
	//loop through drawing steps
	for (var i=0; i<=steps; i++) {
		draw_local_frame(fid, i)
	}

}




function draw_local_frame(fid, istep) {	
	
	//create canvas
	var child = "<canvas id='canvas-copy-"+local_index+"' class='canvas-copy hidden' width=640px height=360px></canvas>";
	$('.canvas-copy-container').append(child);

	//get the canvas element
	var canDOM = $('#canvas-copy-'+local_index);
	var canvas = canDOM[0];
	var ctx = canvas.getContext("2d");
	local_index++;
			
	//clear canvas
	ctx.fillStyle = 'rgb(255,255,255)';
	ctx.fillRect(0,0,canvas.width, canvas.height);

	//set up scale
	var svgcanvas = $("#canvas-container");
	var svgX = svgcanvas.width();
	var svgY = svgcanvas.height();
	var canX = canvas.width;
	var canY = canvas.height;
	var sx = canX / svgX;
	var sy = canY / svgY;
	
	//loop through all objects from data array and draw
	for (var i=0; i<objects[fid].length; i++) {
	
		//if it's a line
		if (objects[fid][i] && objects[fid][i].type == 'line') {
		
			var n1 = objects[fid][i].node1;
			var n1x = objects[fid][n1].x + (deltas[n1].x * istep);
			var n1y = objects[fid][n1].y + (deltas[n1].y * istep);
			var n2 = objects[fid][i].node2;
			var n2x = objects[fid][n2].x + (deltas[n2].x * istep);
			var n2y = objects[fid][n2].y + (deltas[n2].y * istep);
			var size = objects[fid][i].size + (deltas_ls[i].size * istep);
			var color = objects[fid][i].color;
			
			//rescale
			n1x = n1x * sx;
			n1y = n1y * sy;
			n2x = n2x * sx;
			n2y = n2y * sy;
			size = size * sy;
			
			//draw
			ctx.beginPath();
			ctx.moveTo(n1x, n1y);
			ctx.lineTo(n2x, n2y);
			ctx.lineWidth = size;
			ctx.strokeStyle = color;
			ctx.lineCap = 'round';
			ctx.stroke();
		}
		
		
		//if it's a circle
		if (objects[fid][i] && objects[fid][i].type == 'circle') {
		
			var n1 = objects[fid][i].node1;
			var n1x = objects[fid][n1].x + (deltas[n1].x * istep);
			var n1y = objects[fid][n1].y + (deltas[n1].y * istep);
			var n2 = objects[fid][i].node2;
			var n2x = objects[fid][n2].x + (deltas[n2].x * istep);
			var n2y = objects[fid][n2].y + (deltas[n2].y * istep);
			var size = objects[fid][i].size;
			var color = objects[fid][i].color;
		
			var centerx = (n1x + n2x) / 2;
			var centery = (n1y + n2y) / 2;
			
			//calculate radius
			var dx = n1x - n2x;
			var dy = n1y - n2y;
			var dia = Math.pow((dx * dx + dy * dy),0.5);
			var rad = dia / 2;
			
			//rescale
			centerx = centerx * sx;
			centery = centery * sy;
			rad = rad * sx;
			size = size * sy;
			
			//add circle
			ctx.beginPath();
			ctx.arc(centerx, centery, rad, 0, 2 * Math.PI, false);
			ctx.lineWidth = size;
			ctx.strokeStyle = color;
			ctx.lineCap = 'round';
			ctx.stroke();
		}
		
		
		//if it's an arc
		if (objects[fid][i] && objects[fid][i].type == 'arc') {
	
			var n1 = objects[fid][i].node1;
			var n1x = objects[fid][n1].x + (deltas[n1].x * istep);
			var n1y = objects[fid][n1].y + (deltas[n1].y * istep);
			var n2 = objects[fid][i].node2;
			var n2x = objects[fid][n2].x + (deltas[n2].x * istep);
			var n2y = objects[fid][n2].y + (deltas[n2].y * istep);
			var n3 = objects[fid][i].node3;
			var n3x = objects[fid][n3].x + (deltas[n3].x * istep);
			var n3y = objects[fid][n3].y + (deltas[n3].y * istep);
			var size = objects[fid][i].size;
			var color = objects[fid][i].color;
			
			//rescale
			n1x = n1x * sx;
			n1y = n1y * sy;
			n2x = n2x * sx;
			n2y = n2y * sy;
			n3x = n3x * sx;
			n3y = n3y * sy;
			size = size * sy;
			
			//draw
			ctx.beginPath();
			ctx.moveTo(n1x, n1y);
			ctx.bezierCurveTo(n1x, n1y, n3x, n3y, n2x, n2y);
			ctx.lineWidth = size;
			ctx.strokeStyle = color;
			ctx.lineCap = 'round';
			ctx.stroke();
		}

	}
	
}






function local_frame_move() {
	$('.canvas-copy').addClass('hidden');
	var value = $('#local-frame-slider').val();
	$('#canvas-copy-'+value).removeClass('hidden');
}





function close_canvas() {
	$('#canvas-copy-div').addClass('hidden');
	
	//clear frames
	$('#canvas-copy-div .canvas-copy').remove();
}








