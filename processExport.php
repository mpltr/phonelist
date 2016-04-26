<?php
    date_default_timezone_set('Europe/London');
    $i = 0;
    $dir = 'contactsarchive/';
    if ($handle = opendir($dir)) {
        while (($file = readdir($handle)) !== false){
            if (!in_array($file, array('.', '..')) && !is_dir($dir.$file)) 
                $i++;
        }
    }#
    
    $files = glob( 'contactsarchive/*.txt' );
    array_multisort(
    array_map( 'filemtime', $files ),
    SORT_NUMERIC,
    SORT_ASC,
    $files
    );

    if ($i > 30){
        unlink($files[0]);
    }

    $mydate=getdate(date("U"));
    $fileName = "$mydate[weekday] $mydate[mday] $mydate[month] $mydate[hours].$mydate[minutes].$mydate[seconds]";
    $file = 'contacts.txt';
    $newfile = 'contactsarchive/' . $fileName . '.txt';
    if (!copy($file, $newfile)) {
    echo "failed to copy";
    }
	$str_json = file_get_contents('php://input');
	$myFile = fopen("contacts.txt", "w");
	fwrite ($myFile, $str_json);
	fclose($myFile);
?>