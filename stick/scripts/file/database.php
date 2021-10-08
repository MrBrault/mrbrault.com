<?php

//connect to database
include 'connect.php';
$con = mysql_connect($Server, $Username, $Password) or die(mysql_error());
mysql_select_db($Database, $con) or die(mysql_error());


$action = $_POST['dbaction'];


if ($action == 'list') {

	$output = "";
	$result = mysql_query("SELECT * FROM savedata ORDER BY name ASC");
	while($row = mysql_fetch_array($result)) {
		$output .= $row['name']."xxsmaxx";
	}

	echo $output;

}



if ($action == 'load') {

	$name = $_POST['dbname'];

	$result = mysql_query("SELECT * FROM savedata WHERE name='".$name."'");
	$row = mysql_fetch_array($result);
	echo ($row['data']);

}



if ($action == 'save') {

	$name = $_POST['dbname'];
	$data = $_POST['dbdata'];

	//check if it exists
	$result = mysql_query("SELECT * FROM savedata WHERE name='".$name."'");
	
	if (mysql_num_rows($result) != 0) {
		mysql_query("UPDATE savedata SET data='".$data."' WHERE name='".$name."'");
	} else {
		mysql_query("INSERT INTO savedata (name, data) VALUES ('".$name."', '".$data."')");
	}
	
}


if ($action == 'delete') {

	$name = $_POST['dbname'];

	//check if it exists
	mysql_query("DELETE FROM savedata WHERE name='".$name."'");
	
}


?>