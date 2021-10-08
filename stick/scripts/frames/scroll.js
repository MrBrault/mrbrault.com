



function scroll_frame(dir) {

	if (dir == 'right') { d = -1; }
	if (dir == 'left') { d = 1; }
	
	window.setTimeout("scroll_timer(0);",50);
	
}


function scroll_timer(index) {

	var path = [1,3,5,7,9,11,13,15,17,19,21,23,21,19,17,15,13,11,9,7,5,3,1];
	var delta = d * path[index];
	index++;

	var lef = $('#frames-container').scrollLeft();
	$('#frames-container').scrollLeft(lef+delta);
	
	if (index < path.length) {
		window.setTimeout("scroll_timer("+index+");",50);
	}
	
}



function scroll_all_left(lastval) {

	$('#frames-container').scrollLeft(lastval+10);
	
	var lef = $('#frames-container').scrollLeft();
	if (lef != lastval) {
		window.setTimeout("scroll_all_left("+lef+");",5);
	}
	
}



