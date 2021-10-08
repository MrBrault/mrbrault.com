

function save_menu() {
	$('#save-options-div').removeClass('hidden');
}




function close_save_options(opt) {

	if (opt == 'cancel') {
		$('#save-options-div').addClass('hidden');
		return;
	}
	
	//get string for objects
	var savedata_objects = JSON.stringify(objects);
	
	//then string for options
	var temp = [];
	for (var i=0; i<objects.length-1; i++) {
		temp[i] = objects[i].options;
	}
	var savedata_options = JSON.stringify(temp);
	
	//combine
	var savedata = savedata_objects + "xxsmaxx" + savedata_options;
	
	//compress
	var comp = $('#save-comp-yes').hasClass('save-button-active');
	if (comp == true) {
		//step 1: replace
		savedata = savedata.replace(/type/g,'b');
		savedata = savedata.replace(/node1/g,'ae');
		savedata = savedata.replace(/node2/g,'g');
		savedata = savedata.replace(/node3/g,'h');
		savedata = savedata.replace(/node/g,'j');
		savedata = savedata.replace(/lines/g,'k');
		savedata = savedata.replace(/line/g,'ac');
		savedata = savedata.replace(/circle/g,'q');
		savedata = savedata.replace(/arc/g,'ad');
		savedata = savedata.replace(/size/g,'v');
		savedata = savedata.replace(/color/g,'w');
		savedata = savedata.replace(/steps/g,'aa');
		//step 2: LZ	
		savedata = LZString.compressToBase64(savedata);
	}
	
	//filename
	var savefileasname = $('#save-options-filename').val();

	//get location
	var isserver = $('#save-loc-server').hasClass('save-button-active');
	if (isserver == true) {
		save_to_server(savefileasname, savedata);
	} else {
		save_to_local(savefileasname, savedata);
	}
	
	//close window
	$('#save-options-div').addClass('hidden');

}





//save locally
function save_to_local(name,data) {

	var textFileAsBlob = new Blob([data], {type:'text/plain'});

	//create a.href and click
	var downloadLink = document.createElement("a");
	downloadLink.download = name;
	downloadLink.innerHTML = "Download File";
	downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
	downloadLink.click();
	
}





//save to database
function save_to_server(name,data) {

	//encode name
	name = name.replace(/&amp;/g, '&');
	name = encodeURIComponent(name);
	
	//send to db
	$.ajax({
		type: "POST",
		url: "scripts/file/database.php",
		data: {dbaction: "save", dbname: name, dbdata: data},
		complete: function(data){
			//on return
		}
		
	});
	
	
}












//auto select filename on click
function selectText(textField) {
	textField.focus();
	textField.select();
}



//only allow 1 compression checked
function save_compress(dom) {
	var isactive = $(dom).hasClass('save-button-active');
	//if it's already picked then break
	if (isactive == true) { return; }
	//else then make active
	$('#save-comp-yes').removeClass('save-button-active');
	$('#save-comp-no').removeClass('save-button-active');
	$(dom).addClass('save-button-active');
	
	//if the location is server then it has to be compressed
	var isserver = $('#save-loc-server').hasClass('save-button-active');
	if (isserver == true) {
		$('#save-comp-yes').addClass('save-button-active');
		$('#save-comp-no').removeClass('save-button-active');
	}
}



//only allow 1 location checked
function save_location(dom) {
	var isactive = $(dom).hasClass('save-button-active');
	//if it's already picked then break
	if (isactive == true) { return; }
	//else then make active
	$('#save-loc-local').removeClass('save-button-active');
	$('#save-loc-server').removeClass('save-button-active');
	$(dom).addClass('save-button-active');
	
	//if the location is server then it has to be compressed
	var isserver = $('#save-loc-server').hasClass('save-button-active');
	if (isserver == true) {
		$('#save-comp-yes').addClass('save-button-active');
		$('#save-comp-no').removeClass('save-button-active');
	}
}
















