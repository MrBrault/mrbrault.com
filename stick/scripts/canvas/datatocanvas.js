

//functino to draw scene data onto canvas
function data_to_canvas(did, canDOM) {

	//set up canvas
	var canvas = canDOM[0];
	var ctx = canvas.getContext("2d");
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
	for (var i=0; i<objects[did].length; i++) {
	
		//if it's a line
		if (objects[did][i] && objects[did][i].type == 'line') {
		
			var n1 = objects[did][i].node1;
			var n1x = objects[did][n1].x;
			var n1y = objects[did][n1].y;
			var n2 = objects[did][i].node2;
			var n2x = objects[did][n2].x;
			var n2y = objects[did][n2].y;
			var size = objects[did][i].size;
			var color = objects[did][i].color;
			
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
		if (objects[did][i] && objects[did][i].type == 'circle') {
		
			var n1 = objects[did][i].node1;
			var n1x = objects[did][n1].x;
			var n1y = objects[did][n1].y;
			var n2 = objects[did][i].node2;
			var n2x = objects[did][n2].x;
			var n2y = objects[did][n2].y;
			var size = objects[did][i].size;
			var color = objects[did][i].color;
		
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
		if (objects[did][i] && objects[did][i].type == 'arc') {
		
			var n1 = objects[did][i].node1;
			var n1x = objects[did][n1].x;
			var n1y = objects[did][n1].y;
			var n2 = objects[did][i].node2;
			var n2x = objects[did][n2].x;
			var n2y = objects[did][n2].y;
			var n3 = objects[did][i].node3;
			var n3x = objects[did][n3].x;
			var n3y = objects[did][n3].y;
			var size = objects[did][i].size;
			var color = objects[did][i].color;
			
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


