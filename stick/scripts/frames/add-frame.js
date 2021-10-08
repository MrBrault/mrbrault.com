


function add_frame() {

	//add new scene into array after current one
	var fid = scene + 1;
	objects.splice(fid,0,[]);
	objects[fid] = [];
	
	//add options for previous frame
	objects[scene].options = {'steps': 'D'};
	

	//add frame to bottom
	var newchild = "<img src=\"icons/options.jpg\" onclick='show_frame_options(this);'>";
	newchild += "<button class='frame-button' onclick='change_frame(this);'><div class='frame-button-number'></div><canvas class='frame-canvas'></canvas></button>";
	
	var currentchild = $('#frames-container button:eq('+scene+')')

	$(currentchild).after(newchild);
	
	//autoscroll
	scroll_frame('left');
	
	//copy data
	objects[fid] = $.extend(true, [], objects[scene]);
	
	//redraw
	change_frame();
	
}






