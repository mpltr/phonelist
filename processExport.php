<?php
	$str_json = file_get_contents('php://input');
	$myFile = fopen("contacts.txt", "w");
	fwrite ($myFile, $str_json);
	fclose($myFile);
?>