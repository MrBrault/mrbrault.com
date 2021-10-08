/*
Okay, this sucks but I can't get the progress bar
to show up unless there's a break in the action
so I'm going to make a bunch of sub-functions
and use setTimeOut to call them
*/


function play() {

	//get the canvas element
	var child = "<canvas id='canvas-copy' class='canvas-copy' width=640px height=360px></canvas>";
	$('.canvas-copy-container').append(child);
	canDOM = $('#canvas-copy');
	
	//hide the player
	$('#canvas-copy-div').addClass('hidden');

	//set up encoder
	encoder = new GIFEncoder();
	encoder.setRepeat(0); 	//0  -> loop forever  1+ -> loop n times then stop
	encoder.setDelay(frame_rate); 	//go to next frame every n milliseconds
	encoder.setSize(canDOM[0].width, canDOM[0].height);
	encoder.start();

	//show progress bar
	$('#gif-creation-div').removeClass('hidden');
	var pb = $('#gif-creation-progress');
	pb[0].value = 0;
	$('#gif-creation-value').html('Starting encoding...');
	//get total number of steps
	total_steps = 0;
	steps_taken = 0;
	for (var i=0; i<objects.length-1; i++) {
		if (objects[i].options.steps == 'D') {
			total_steps += default_steps + 1;
		} else {
			total_steps += parseInt(objects[i].options.steps) + 1;
		}
	}
	
	//first pause
	frame_index = 0;
	window.setTimeout("play2();",500);
	
}





//loop through frames
function play2() {

	//add intermediate steps
	intermedate1(frame_index);
	
	frame_index++;
}





//finish up frames
function play3() {
		
	
	//run last frame
	data_to_canvas(objects.length-1, canDOM);
	var canvas = canDOM[0];
	var ctx = canvas.getContext("2d");
	encoder.addFrame(ctx);
	
	
	//update progress bar
	$('#gif-creation-progress').value = 100;
	$('#gif-creation-value').html('Finishing encoding...');
	
	//finish gif
	window.setTimeout("play4();",500);

}




//finish up gif
function play4() {
		
	//finish encoding
	encoder.finish();
	var binary_gif = encoder.stream().getData() //notice this is different from the as3gif package!
	var data_url = 'data:image/gif;base64,'+encode64(binary_gif);
	
	//hide progress bar
	$('#gif-creation-div').addClass('hidden');	
	
	//show
	$('#gif-image-div').removeClass('hidden');
	$('#gif-image').attr("src",data_url);
	

}




function close_gif() {
	$('#gif-image-div').addClass('hidden');
}