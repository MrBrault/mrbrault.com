function open_menu() {
	$('#open-options-div').removeClass('hidden');
}





function open_options(loc) {

	if (loc == 'cancel') {
		$('#open-options-div').addClass('hidden');
		return;
	}

	if (loc == 'local') {
		$('#input_file_button').click();
	}
	
	if (loc == 'server') {
		get_server_list();
	}
	
	//hide menu
	$('#open-options-div').addClass('hidden');
}





//open local file
function open_file(evt) {

	//get the file
	var f = evt.files[0]; 

	//create reader for file
	var r = new FileReader();
	r.readAsText(f);
	//create onload event
	r.onload = function(e) { 
	
		var contents = e.target.result;
		build_data(contents);
	}

}








//open server file (starts here)
function get_server_list() {
		
	//send to db
	$.ajax({
		type: "POST",
		url: "scripts/file/database.php",
		data: {dbaction: "list"},
		complete: function(data){
			//on return
			var contents = data.responseText.split('xxsmaxx');
			//clear table
			$(".filelist-table tr").remove();
			//fill in rows
			for (var i = 0; i<contents.length-1; i++) {
				var name = decodeURIComponent(contents[i]);
				var newrow = "<tr>";
				newrow += "<td class='filelist-name' onclick='server_file_click(this)';>"+name+"</td>";
				newrow += "</tr>";
				$('.filelist-table').append(newrow);
			}
			$('#server-filelist-div').removeClass('hidden');
		}
	});
	

}


//get clicked file
function server_file_click(dom) {

	$('.filelist-table td').removeClass('filelist-name-click');
	$(dom).addClass('filelist-name-click');
}


function open_server_file(opt) {

	if (opt == 'cancel') {
		$('#server-filelist-div').addClass('hidden');
		return;
	}
	
	//get which one is picked
	var name = $('.filelist-table .filelist-name-click').html();
	
	//open
	if (opt == 'open') {
		get_server_file(name);
	}
	//delete
	if (opt == 'delete') {
		delete_server_file(name);
	}
}



function get_server_file(name) {
	
	//encode name
	name = name.replace(/&amp;/g, '&');
	name = encodeURIComponent(name);
	
	//send to db
	$.ajax({
		type: "POST",
		url: "scripts/file/database.php",
		data: {dbaction: "load", dbname: name},
		complete: function(data){
			//on return
			var contents = data.responseText;
			build_data(contents);
			//close popup
			$('#server-filelist-div').addClass('hidden');
		}
	});
}


function delete_server_file(name) {
	
	var r=confirm("Delete File?");
	if (r==true) {
		//encode name
		name = name.replace(/&amp;/g, '&');
		name = encodeURIComponent(name);
		
		//send to db
		$.ajax({
			type: "POST",
			url: "scripts/file/database.php",
			data: {dbaction: "delete", dbname: name},
			complete: function(data){
				//on return
				$('.filelist-table .filelist-name-click').remove();
			}
		});
	}
}





//called after we have the data
function build_data(contents) {


	//build array
	
	//check if it's compressed
	var temp = contents.split('xxsmaxx');
	if (temp.length == 1) {
		//Step 1: LZ
		var contents = LZString.decompressFromBase64(contents);
		//Step2: replace
		contents = contents.replace(/b/g,'type');
		contents = contents.replace(/ae/g,'node1');
		contents = contents.replace(/g/g,'node2');
		contents = contents.replace(/h/g,'node3');
		contents = contents.replace(/j/g,'node');
		contents = contents.replace(/k/g,'lines');
		contents = contents.replace(/ac/g,'line');
		contents = contents.replace(/q/g,'circle');
		contents = contents.replace(/ad/g,'arc');
		contents = contents.replace(/v/g,'size');
		contents = contents.replace(/w/g,'color');
		contents = contents.replace(/aa/g,'steps');
	}

	
	//break into objects and options
	var temp = contents.split('xxsmaxx');
	objects = [];
	objects = JSON.parse(temp[0]);
	options = [];
	options = JSON.parse(temp[1]);
	
	//combine
	for (var i=0; i<objects.length; i++) {
		objects[i].options = options[i];
	}
	
	//clear the scene
	paper.clear();
	
	//clear frames at bottom
	$('#frames-container button').remove();
	$('#frames-container img').remove();
	
	//add all the frames at the bottom
	for (var i=0; i<objects.length; i++) {
		var newchild = "<button class='frame-button' onclick='change_frame(this);'><div class='frame-button-number'></div><canvas class='frame-canvas'></canvas></button>";
		if (i != objects.length-1) {
			newchild += "<img src=\"icons/options.jpg\" onclick='show_frame_options(this);'>";
		}
		$('#frames-container').append(newchild);
	}

	//update canvas
	for (var i=0; i<objects.length; i++) {
		var oldDOM = $('#frames-container button:eq('+i+')');
		var canDOM = $(oldDOM).children('canvas');
		data_to_canvas(i, canDOM);
	}		
		
	//rebuild first scene
	scene = 0;
	draw_full(scene);
	$('#frames-container button:nth-child(1)').addClass('current-frame');
	
	//autoscroll to last frame
	scroll_all_left(0);
	


}


