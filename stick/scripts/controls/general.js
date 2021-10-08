
//function for various button layouts
function buttons(layoutid) {

	$('.optional').addClass('hidden');
	$('.sub-group-top').css('height', "0px");
	$('.canvas-outer-container').css('height', "385px");


	//nothing selected
	if (layoutid == 1) {
		$('#node-button').removeClass('hidden');
		$('#show-hide-elements-button').removeClass('hidden');
		$('#grid-button').removeClass('hidden');
		$('#zoomin-button').removeClass('hidden');
		$('#zoomout-button').removeClass('hidden');
	}

	//1 node selected
	if (layoutid == 2) {
		$('#line-button').removeClass('hidden');
		$('#arc-button').removeClass('hidden');
		$('#circle-button').removeClass('hidden');
		$('#multi-button').removeClass('hidden');
		$('#split-button').removeClass('hidden');
		$('#move-node-menu-button').removeClass('hidden');
		$('#delete-button').removeClass('hidden');
	}

	//multi node selected
	if (layoutid == 3) {
		$('#join-button').removeClass('hidden');
	}

	//1 line selected
	if (layoutid == 4) {
		$('#vert-button').removeClass('hidden');
		$('#horz-button').removeClass('hidden');
		$('#move-line-menu-button').removeClass('hidden');
		$('#set-button').removeClass('hidden');
		$('#color-button').removeClass('hidden');
		$('#line-size-menu-button').removeClass('hidden');
		$('#delete-button').removeClass('hidden');
	}

	//line set selected
	if (layoutid == 5) {
		$('#rot-set-menu-button').removeClass('hidden');
		$('#move-set-menu-button').removeClass('hidden');
		$('#shrink-grow-set-menu-button').removeClass('hidden');
	}

}



function move_node_menu() {
	$('.sub-group-top').css('height', "55px");
	$('.canvas-outer-container').css('height', "330px");
	$('#move-left-button').removeClass('hidden');
	$('#move-up-button').removeClass('hidden');
	$('#move-down-button').removeClass('hidden');
	$('#move-right-button').removeClass('hidden');
	$('#moveby-1-button').removeClass('hidden');
	$('#moveby-10-button').removeClass('hidden');
	$('#moveby-45-button').removeClass('hidden');
	$('#okmenu-button').removeClass('hidden');
}


function move_line_menu() {
	buttons(4);
	$('.sub-group-top').css('height', "55px");
	$('.canvas-outer-container').css('height', "330px");
	$('#move-left-button').removeClass('hidden');
	$('#move-up-button').removeClass('hidden');
	$('#move-down-button').removeClass('hidden');
	$('#move-right-button').removeClass('hidden');
	$('#moveby-1-button').removeClass('hidden');
	$('#moveby-10-button').removeClass('hidden');
	$('#moveby-45-button').removeClass('hidden');
	$('#okmenu-button').removeClass('hidden');
}


function line_size_menu() {
	buttons(4);
	$('.sub-group-top').css('height', "55px");
	$('.canvas-outer-container').css('height', "330px");
	$('#line1-button').removeClass('hidden');
	$('#line2-button').removeClass('hidden');
	$('#line5-button').removeClass('hidden');
	$('#line10-button').removeClass('hidden');
	$('#lineup-button').removeClass('hidden');
	$('#linedown-button').removeClass('hidden');
	$('#okmenu-button').removeClass('hidden');
}

function move_set_menu() {
	buttons(5);
	$('.sub-group-top').css('height', "55px");
	$('.canvas-outer-container').css('height', "330px");
	$('#move-left-button').removeClass('hidden');
	$('#move-up-button').removeClass('hidden');
	$('#move-down-button').removeClass('hidden');
	$('#move-right-button').removeClass('hidden');
	$('#moveby-1-button').removeClass('hidden');
	$('#moveby-10-button').removeClass('hidden');
	$('#moveby-45-button').removeClass('hidden');
	$('#okmenu-button').removeClass('hidden');
}

function rotate_set_menu() {
	buttons(5);
	$('.sub-group-top').css('height', "55px");
	$('.canvas-outer-container').css('height', "330px");
	$('#rot-pos-button').removeClass('hidden');
	$('#rot-neg-button').removeClass('hidden');
	$('#moveby-1-button').removeClass('hidden');
	$('#moveby-10-button').removeClass('hidden');
	$('#moveby-45-button').removeClass('hidden');
	$('#okmenu-button').removeClass('hidden');
}

function shrink_grow_set_menu() {
	buttons(5);
	$('.sub-group-top').css('height', "55px");
	$('.canvas-outer-container').css('height', "330px");
	$('#grow-set-button').removeClass('hidden');
	$('#shrink-set-button').removeClass('hidden');
	$('#moveby-1-button').removeClass('hidden');
	$('#moveby-10-button').removeClass('hidden');
	$('#moveby-45-button').removeClass('hidden');
	$('#okmenu-button').removeClass('hidden');
}

function line_color_menu() {
	buttons(4);
	$('.sub-group-top').css('height', "55px");
	$('.canvas-outer-container').css('height', "330px");
	$('.control-button.color').removeClass('hidden');
	$('#okmenu-button').removeClass('hidden');
}




function ok_menu() {
	$('.sub-group-top').css('height', "0px");
	$('.canvas-outer-container').css('height', "385px");
}






