function show_help() {
	$('#help-div').removeClass('hidden');
	help_loc = 0;
	help_page(help_loc);
}





function help_page(dir) {

	if (dir == 'close') {
		$('#help-div').addClass('hidden');
		return;
	}
	
	help_loc += dir;
	
	
	//set up help data
	var data = helpdata(help_loc);

	
	//fill in data
	$('#help-title').html(data[0]);
	$('#help-pre-text').html(data[1]);
	if (data[2]) {
		$('#help-pic-div').removeClass('hidden');
		$('#help-pic').attr('src','help/'+data[2]+'.jpg');
	} else {
		$('#help-pic-div').addClass('hidden');
	}
	$('#help-post-text').html(data[3]);
	
	
	
	
	//catches for hidden elements
	
	if (help_loc == 0) {
		$('.help-back').addClass('hidden');
		$('.help-page').html('');
	} else {
		$('.help-back').removeClass('hidden');
		$('.help-page').html(help_loc);
	}
	
	
	if (help_loc >= 25) {
		$('.help-forward').addClass('hidden');
	} else {
		$('.help-forward').removeClass('hidden');
	}

}






function helpdata(loc) {

	var title = [];
		title.push( "Table of Contents" );
		title.push( "Overview" );
		title.push( "Overview" );
		title.push( "Workspace Layout" );
		title.push( "File Operations and Global Options Toolbar" );
		title.push( "Drawing Toolbar" );
		title.push( "Drawing Toolbar" );
		title.push( "Drawing Toolbar" );
		title.push( "Drawing Toolbar" );
		title.push( "Drawing Toolbar" );
		title.push( "Drawing Toolbar" );
		title.push( "Drawing Toolbar" );
		title.push( "Drawing Toolbar" );
		title.push( "Drawing Toolbar" );
		title.push( "Drawing Toolbar" );
		title.push( "Drawing Toolbar" );
		title.push( "Play Toolbar" );
		title.push( "Animation Toolbar" );
		title.push( "Animation Toolbar" );
		title.push( "Amination" );
		title.push( "Web Setup" );
		title.push( "Notes" );
		title.push( "About" );
		title.push( "Credits" );
		title.push( "Future Plans" );
		title.push( "" );
	
	var pre_text = [];
		pre_text.push( "<br>Stickman Animation v1.3<br><br>1. <span class='help-toc' onclick='help_page(1);'>Overview</span><br><br>2. <span class='help-toc' onclick='help_page(3);'>Workspace Layout</span><br><br>3. <span class='help-toc' onclick='help_page(4);'>Toolbars</span><br><br>4. <span class='help-toc' onclick='help_page(19);'>Animation</span><br><br>5. <span class='help-toc' onclick='help_page(20);'>Web Setup</span><br><br>6. <span class='help-toc' onclick='help_page(21);'>Notes</span><br><br>7. <span class='help-toc' onclick='help_page(22);'>About</span><br><br>8. <span class='help-toc' onclick='help_page(23);'>Credits</span>" );
		pre_text.push( "" );
		pre_text.push( "" );
		pre_text.push( "" );
		pre_text.push( "" );
		pre_text.push( "<i>Nothing Selected</i>" );
		pre_text.push( "<i>NODE Selected</i>" );
		pre_text.push( "<i>NODE Selected</i>" );
		pre_text.push( "<i>MOVE Submenu</i>" );
		pre_text.push( "<i>ELEMENT Selected</i>" );
		pre_text.push( "<i>ELEMENT COLOR Submenu</i>" );
		pre_text.push( "<i>ELEMENT LINE SIZE Submenu</i>" );
		pre_text.push( "<i>Multiple NODES Selected</i>" );
		pre_text.push( "<i>ELEMENT SET Selected</i>" );
		pre_text.push( "<i>ELEMENT SET ROTATE Submenu</i>" );
		pre_text.push( "<i>ELEMENT SET SCALE Submenu</i>" );
		pre_text.push( "" );
		pre_text.push( "" );
		pre_text.push( "" );
		pre_text.push( "" );
		pre_text.push( "" );
		pre_text.push( "" );
		pre_text.push( "<br><br><br><br><br><br>Stickman Animation<br><br>&copy; ch33s3cak3<br><br>2014<br><br>Licensed under GNU" );
		pre_text.push( "<br><br>JQuery<br>jquery.com<br><br>Raphael<br>raphaeljs.com<br><br>lz-string<br>pieroxy.net/blog/pages/lz-string/index.html<br><br>jsgif<br>github.com/antimatter15/jsgif<br><br>Icons<br>{home, folder, disk, gear, trashcan, export} = Google images<br>{all the rest} = me" );
		pre_text.push( "<br><br>tooltips<br><br>copy paste<br><br>undo<br><br>construction lines<br><br>gradual color change" );
		pre_text.push( "End of file..." );
	
	var pic = [];
		pic.push( "" );
		pic.push( "" );
		pic.push( "" );
		pic.push( "hf1" );
		pic.push( "hf2" );
		pic.push( "hf3" );
		pic.push( "hf4" );
		pic.push( "hf4" );
		pic.push( "hf5" );
		pic.push( "hf6" );
		pic.push( "hf7" );
		pic.push( "hf8" );
		pic.push( "hf9" );
		pic.push( "hf10" );
		pic.push( "hf11" );
		pic.push( "hf12" );
		pic.push( "hf13" );
		pic.push( "hf14" );
		pic.push( "hf14" );
		pic.push( "" );
		pic.push( "" );
		pic.push( "" );
		pic.push( "" );
		pic.push( "" );
		pic.push( "" );
		pic.push( "" );
	
	
	var post_text = [];
		post_text.push( "" );
		
		post_text.push( "You should already know what to do but just in case I'll go over it here. The idea is to build a scene with basic elements (lines, circles, arcs), copy that scene to a new frame and move some elements slightly, and repeat. After a few frames it'll appear animated.<br><br><u>Nodes:</u><br>The workflow starts with <i>nodes</i>.  All elements need nodes to track their shape.  You can move nodes by dragging on them, or the toolbar buttons (since touchscreens aren't very responsive).<br><br><u>Elements:</u><br>The available elements are <i>lines</i>, <i>circles</i>, and <i>arcs</i>.  You can string several elements together to make a set.  Sets can be moved, scaled, or rotated as a group.  Sets are created by either building on existing nodes or joining nodes of two elements.  And the opposite, splitting coincident nodes, is possible to break sets. Element thickness and color can also be changed.<br><br><i>(cont.)</i>" );
		
		post_text.push( "<u>Frames:</u><br>When you create a new frame, the previous frame is copied over. As you move the elements around you can see a ghost image of the previous frames. The number of ghost images is adjustable.<br><br><u>Animation:</u><br>Click the play button to watch your animation. By default, intermediate frames will be generated to help create a smooth animation. The default number of intermediate frames is adjustable. You can also adjust the number of intermediate frames between 2 user created frames (mostly to remove the intermediate steps to create a clean jump between frames).  You can export your animation as a gif file.<br><br><u>Load & Save:</u><br>You can save your files locally or, if hosted on a web server, in a mysql database." );
		
		post_text.push( "The main working area is the blue grid.  Clicking on an empty space in the work area cancels any node or element selections.<br><br>The upper left toolbar contains buttons for node and element creation and modification.<br><br>The upper right toolbar contains file operations, global options, and the play button.<br><br>The lower toolbar contains the frames of your animation." );
		
		post_text.push( "The file operations should be obvious.  Files are saved either locally or hosted on a web server.  The server setup is discussed in detail later.  You can save local files uncompressed in case you're interested in the raw data.<br><br>The global options include frame speed (ms between each frame), default number of intermediate frames calculated between each user defined frame, and number of ghost images to show from previous frames.<br><br>The play button obviously plays the animation.  During playback you have the option to create a gif file for exporting." );
		
		post_text.push( "The node button simply adds a new node at the center of the screen.  Unless there's a line attached, it won't show up in the animation.<br><br>Element visibility button cycles through full visibility, ghost image, and none for the current frame.  Clicking on the work area resets back to full visibility.<br><br>The background can be toggled between the blue grid or plain white.  The final animation has only a white background.<br>While zooming in on elements, you have the option of having the element thickness scale as well.  This option can be changed in the global options.  Click again to cancel zoom." );
		
		post_text.push( "With one node selected, you can add an element to that node.<br><br>You can select multiple nodes for jointing by holding the CTRL button during selection.  The multi-select button was added in case it's being run on a phone or tablet.<br><br>The split button is used to break 2 or more elements with a coincident node.  Each element will get a new node.<br><br><i>(cont.)</i>" );
		
		post_text.push( "You can move nodes by dragging them with the mouse.  The move button was added for fine or consistent movements, and in case it's being run on a phone or tablet since their response time is a little laggy.  The move button will open the move submenu.<br><br>The delete button will delete the selected node, and any lines attached to it.  THERE IS NO UNDO BUTTON." );
		
		post_text.push( "The move subemenu is for fine or consistent movements.  The original reason was because it's hard to get consistent drags on phones and tablets.<br><br>The arrow buttons are self explanatory.<br><br>The increment buttons determine how many px to move for each click." );
		
		post_text.push( "The vertical and horizontal buttons align all nodes on the selected line.<br><br>Like nodes, you can move elements by dragging them or you can open the move submenu for controlled movements.<br><br>You can select an entire set of <u>linked</u> elements by double-clicking on one of it's elements.  For mobile devices, there's a button for that.  You can select multiple elements by holding down the CTRL button.<br><br>The color and line size buttons open a submenu for changing an element color or line width.<br><br>The delete button will delete the selected element, and any left over nodes." );
		
		post_text.push( "Um, changes the color of an element?<br><br><i>(For now there's no intermediate animation steps for colors.  Any change in color between frames will be instantaneous.)</i>" );
		
		post_text.push( "Changes the line width for an element.<br><br>There are 4 preset line widths.  You can also increase or decrease the line width incrementally by 1px.<br><br>Any changes to line width between frames are smoothed out during the intermediate frames." );
		
		post_text.push( "When multiple nodes are selected, you can join them together and link their elements.  The first node selected is the master node.  All other nodes will be moved to the location of the master node and then deleted." );
		
		post_text.push( "Element sets can be moved, rotated, and scaled as a group.<br><br>Each button opens a submenu.  The move submenu is the same as the node and element move submenu." );
		
		post_text.push( "Element sets can be rotated as a group.  You can rotate them clockwise (CW) (+) or counter-clockwise (CCW) (-).<br><br>The increment buttons determine how many degrees to rotate for each click." );
		
		post_text.push( "Element sets can be scaled as a group.<br><br>The increment buttons determine how many pixels to expand or shrink the group by for each click." );
		
		post_text.push( "After playing an animation you have the options to replay it, create a gif, or close.<br><br>When creating a gif, a similar window will appear and play the animation over and over.  To save, right click on it and select <i>Save As</i>." );
		
		post_text.push( "The animation area contains the frames of your animation.<br><br>Selecting a frame will load that frame into the workspace.  Changes to the current frame will not affect any other existing frame.<br><br>The <i>add frame</i> button will add a new frame directly after the current frame.  All new frames have the current frame elements copied to it.<br><br><i>(cont.)</i>" );
		
		post_text.push( "The <i>animation options</i> button between frames allows changing the number of intermediate steps during animation.<br><br>Intermediate steps are calculated using node internal IDs.  Every time you create a node it gets a new ID.  When you delete a node, that ID is never reused.  When you add a frame, the copied elements have the same node IDs as the previous frame.  This is an <u>important</u> concept to understand in order to have the intermediate calculations work <b>for</b> you and not <b>against</b> you.<br><br>If you need to have a node or element jump from one location to another without intermediate steps, you can remove them with this option." );
		
		post_text.push( "Animation is pretty straightforward.  Create some frames, click the <i>Play</i> button.  If you like it then click the <i>Export</i> button.  When the gif is playing, right-click on it and <i>save as</i>.<br><br>The speed between frames is controlled in the global options as well as the number of intermediate calculated frames.  Please refer to <span class='help-toc' onclick='help_page(-1);'><i><u>this</u></i></span> section for detailed information on intermediate frames and how they affect your animation." );
		
		post_text.push( "You can run this from a web site and save files directly to a database.  The reason I added this option is so I can work on my animations whenever I want (even when I'm waiting for my wife to try on clothes at the store).<br><br>You need to have a mysql database set up before hand. You can call your database whatever you want.  Just update the connect.php file with the correct credentials.<br><br>The way the php code is set up initially, the table is called \"savedata\" with 2 columns, \"name\" (varchar30) and \"data\" (longtext).  Feel free to change as you want.  You'll just need to modify the database.php file." );
		
		post_text.push( "1. I wrote this for myself because I didn't like the ones out there.  If you don't like it write your own.<br><br>2. I wrote this for use on Chrome browser.  If it doesn't look good on IE, modify the css or write your own.<br><br>3. There's probably some bugs.  I'm okay with that.<br><br>4. I'm not a programmer.  I made this in my spare time.  If you don't like my code then write your own.<br><br>5. This program is provided AS IS.  If it blows up your computer it's not my fault.<br><br>6. This will not catch all stupidity.  For example, if you select ALL nodes and try to join them, it'll probably fail.  Don't be stupid.<br><br>7. Some screenshots are from previous releases." );
		
		post_text.push( "" );
		post_text.push( "" );
		post_text.push( "" );
		post_text.push( "" );
	
	
	
	
	
	
	
	return [title[loc],pre_text[loc],pic[loc],post_text[loc]];
}


















