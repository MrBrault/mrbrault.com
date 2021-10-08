/*
This is similar to 'datatocanvas.js' except
where that one is passed a canvas DOM to patint to
and uses one frame data, this only paints to the GIF canvas
and run through intermediate steps between each frame data.
*/


/*
again broken up because progress bar won't show
*/


function intermedate1(fid) {

	//check if it's the last step
	if (fid == objects.length-1) {
		window.setTimeout("play3();",50);
		return;
	}
	
	//get the canvas element
	canDOM = $('#canvas-copy');
	canvas = canDOM[0];
	ctx = canvas.getContext("2d");
	
	//get number of steps for this frame
	steps = objects[fid].options.steps;
	if (steps == 'D') {
		steps = default_steps;
	} else {
		steps = parseInt(steps);
	}

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
	
	step=0;
	window.setTimeout("intermedate2("+fid+");",1);

}




function intermedate2(fid) {	
	
	if (step <= steps) {
	
		//draw on canvas (repeat)
		
		//update progress bar
		steps_taken++;
		var pb = $('#gif-creation-progress');
		pb[0].value = Math.floor((steps_taken / total_steps) * 100);
		$('#gif-creation-value').html('Frame '+(fid+1)+'.'+step+' of '+objects.length);
				
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
				var n1x = objects[fid][n1].x + (deltas[n1].x * step);
				var n1y = objects[fid][n1].y + (deltas[n1].y * step);
				var n2 = objects[fid][i].node2;
				var n2x = objects[fid][n2].x + (deltas[n2].x * step);
				var n2y = objects[fid][n2].y + (deltas[n2].y * step);
				var size = objects[fid][i].size;
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
				var n1x = objects[fid][n1].x + (deltas[n1].x * step);
				var n1y = objects[fid][n1].y + (deltas[n1].y * step);
				var n2 = objects[fid][i].node2;
				var n2x = objects[fid][n2].x + (deltas[n2].x * step);
				var n2y = objects[fid][n2].y + (deltas[n2].y * step);
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
				var n1x = objects[fid][n1].x + (deltas[n1].x * step);
				var n1y = objects[fid][n1].y + (deltas[n1].y * step);
				var n2 = objects[fid][i].node2;
				var n2x = objects[fid][n2].x + (deltas[n2].x * step);
				var n2y = objects[fid][n2].y + (deltas[n2].y * step);
				var n3 = objects[fid][i].node3;
				var n3x = objects[fid][n3].x + (deltas[n3].x * step);
				var n3y = objects[fid][n3].y + (deltas[n3].y * step);
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
		
		
		encoder.addFrame(ctx);
		
		//index and call again
		step++;
		window.setTimeout("intermedate2("+fid+");",1);
	
		
	} else {
		//done looping through steps
		window.setTimeout("play2();",1);
	}
	
}








