<!DOCTYPE html>

<?php include("password_protect.php"); ?>
<html lan="en">
    <head>
        <meta charset="utf-8" />
        <title>RSG Phonelist Admin</title>    
    </head>
    <body>
    <link rel="stylesheet" href="style.css">
	<div id="loading">
		<img src="ring.gif"/>	
	</div>
	<div id="scrollUp">
		<img src="up.png"/>
	</div>
	<div id="fade">
	</div>
	<div id="confirm">
		<div id="confirmMessage">Click Export to overwrite contacts list or click Cancel.</div><br>
		<button id="confirmYes" class="confirmButton">Export</button>
		<button id="confirmNo" class="confirmButton">Cancel</button>
	</div>
    <div id="adminConsole">
        <button id="add">Add</button>
        <button id="delete">Delete</button>
        <button id="save">Sort</button>
        <button id="export">Export</button>     
    </div>    
    <div id="wrapper">
        <div id="header">
            <img src="rsg-logo.png"/>
        </div>
        <div id="inputs">
            <img src="PL.png"/>
            <img id="searchIcon" src="search.png"/>
            <input type="text" id="searchBox"></input>
        </div>   
         <table id="table">
            <tr id="topRow" class="tableHeader">
                <td id="FirstName" class="rowHeader">First Name</td>
                <td id="SecondName" class="rowHeader">Second Name</td>
                <td id="internal" class="rowHeader">Internal</td>
                <td id="external" class="rowHeader">Direct / Mobile</td>
                <td id="office" class="rowHeader">Office</td>
            </tr>
        </table>
    </div>   
        <script src="sec.JS"></script>
        <script src="phonelistAdmin.js"></script>
        
    </body>
</html>