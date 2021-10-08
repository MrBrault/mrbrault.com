


function zoom(dir) {

	if (dir == 'in') {
		//check for alread in zoom mode and if so cancel
		var check = $('#zoomin-button').hasClass('current-frame');
		if (check == true) {
			$("#canvas-container").unbind('mousedown');
			$("#canvas-container").unbind('mousemove');
			$("#canvas-container").unbind('mouseup');
			$('#zoomin-button').removeClass('current-frame');
		} else {
			var canvas = $("#canvas-container");
			canvas.bind('mousedown',start_zoom);							//mouse
			canvas[0].addEventListener("touchstart", start_zoom, false);	//touchscreen
			$('#zoomin-button').addClass('current-frame');
		}
	}
	
	if (dir == 'out') {
	
		var canvas = $("#canvas-container");
	
		if (zoomout.length <= 1) {
			//reset vars
			scale = 1;
			offsetX = 0;
			offsetY = 0;
			zoomout = [];
			//reset view
			paper.setViewBox(offsetX, offsetY, canvas.width(), canvas.height())
			//reset background image
			$('.canvas-container-back-grid').css('background-size',canvas.width()+'px');
			$('.canvas-container-back-grid').css('background-position-x','0px');
			$('.canvas-container-back-grid').css('background-position-y','0px');		
		
		} else {
			//remove last entry
			zoomout.splice(zoomout.length-1,1);
			//get vars
			scale = zoomout[zoomout.length-1][0];
			offsetX = zoomout[zoomout.length-1][1];
			offsetY = zoomout[zoomout.length-1][2];
			zoomwidth = zoomout[zoomout.length-1][3];
			zoomheight = zoomout[zoomout.length-1][4];
			//zoom
			paper.setViewBox(offsetX, offsetY, zoomwidth, zoomheight);
			$('.canvas-container-back-grid').css('background-size',(canvas.width()*scale)+'px');
			$('.canvas-container-back-grid').css('background-position-x',-offsetX*scale+'px');
			$('.canvas-container-back-grid').css('background-position-y',-offsetY*scale+'px');
		}
		//redraw
		zoom_redraw();
	}
	
}



function start_zoom(e) {

	//touchscreen
	if (e.targetTouches) {
		e.preventDefault();
		e.offsetX = e.targetTouches[0].pageX - 25;
		e.offsetY = e.targetTouches[0].pageY - 75;
	}

	startX = e.offsetX / scale + offsetX;
	startY = e.offsetY / scale + offsetY;
	
	endX = startX;
	endY = startY;
	
	var path = "M"+startX+","+startY;
	path += "L"+endX+","+startY;
	path += "L"+endX+","+endY;
	path += "L"+startX+","+endY;
	path += "Z";
	
	zoom_window = paper.path(path);
	zoom_window.attr('stroke', 'rgba(0,0,0,0.25)');
	zoom_window.attr('stroke-width', 1);
	zoom_window.attr('fill', 'rgba(0,0,0,0.25)');
	
	var canvas = $("#canvas-container");
	canvas.bind('mousemove',drag_zoom);							//mouse
	canvas[0].addEventListener("touchmove", drag_zoom, false);	//touchscreen
	canvas.bind('mouseup',stop_zoom);							//mouse
	canvas[0].addEventListener("touchend", stop_zoom, false);	//touchscreen

}

function drag_zoom(e) {

	//touchscreen	
	if (e.targetTouches) {
		e.preventDefault();
		e.offsetX = e.targetTouches[0].pageX - 25;
		e.offsetY = e.targetTouches[0].pageY - 75;
	}

	endX = e.offsetX / scale + offsetX;
	endY = e.offsetY / scale + offsetY;
	
	var path = "M"+startX+","+startY;
	path += "L"+endX+","+startY;
	path += "L"+endX+","+endY;
	path += "L"+startX+","+endY;
	path += "Z";
	
	zoom_window.attr('path',path);
	
	//$('#debug').html(endX+"-"+endY);
	
}

function stop_zoom() {

	//remove box
	zoom_window.remove();
	
	//get canvas object
	var canvas = $("#canvas-container");
	
	//remove event listeners
	canvas.unbind('mousedown');
	canvas.unbind('mousemove');
	canvas.unbind('mouseup');
	canvas[0].removeEventListener("touchstart", start_zoom, false);
	canvas[0].removeEventListener("touchmove", drag_zoom, false);
	canvas[0].removeEventListener("touchend", stop_zoom, false);
	
	//reset buttons
	$('#zoomin-button').removeClass('current-frame');
	
	//check for negative
	if (endX < startX) {
		var temp = endX;
		endX = startX;
		startX = temp;
	}
	if (endY < startY) {
		var temp = endY;
		endY = startY;
		startY = temp;
	}
	
	//check for 0 size box
	if (endX == startX || endY == startY) { return; }
	
	//get current size
	var currentcanvasW = canvas.width() / scale;
	var currentcanvasH = canvas.height() / scale;
	
	//get scale
	var zoomwidth = Math.abs(endX - startX);
	var zoomheight = Math.abs(endY - startY);
	
	var scalex = currentcanvasW / zoomwidth;
	var scaley = currentcanvasH / zoomheight;
	var newscale = Math.min(scalex,scaley);
	
	//resize 9:16
	var newzoomwidth = currentcanvasW / newscale;
	var newzoomheight = currentcanvasH / newscale;
	
	//center window
	var dx = newzoomwidth - zoomwidth;
	var dy = newzoomheight - zoomheight;
	offsetX = startX - (dx / 2);
	offsetY = startY - (dy / 2);
		
	//zoom
	paper.setViewBox(offsetX, offsetY, zoomwidth, zoomheight);
	
	scale *= newscale;
	
	//zoom background grid image
	$('.canvas-container-back-grid').css('background-size',(canvas.width()*scale)+'px');
	$('.canvas-container-back-grid').css('background-position-x',-offsetX*scale+'px');
	$('.canvas-container-back-grid').css('background-position-y',-offsetY*scale+'px');
		
	//redraw
	zoom_redraw();
	
	//save for previous zoom
	zoomout.push([scale, offsetX, offsetY, zoomwidth, zoomheight]);
	

}



function zoom_redraw() {

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







