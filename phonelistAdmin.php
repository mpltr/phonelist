<?php 

// Define your username and password 
$username = "admin"; 
$password = "h4Mgreen1"; 

if ($_POST['txtUsername'] != $username || $_POST['txtPassword'] != $password) { 

?> 
<html lan="en">
    <head>
        <meta charset="utf-8" />
        <title>RSG Phonelist Admin</title> 
        <link rel="stylesheet" href="style.css">
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
    </head>
    <body style="overflow:hidden">
<div id="loginWrapper">
<h2 id="logTit">Phonelist Admin Login</h2>
<form name="form" method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>"> 
    <p><label for="txtUsername">Username</label> 
    <br /><input type="text" title="Enter your Username" name="txtUsername" autofocus/></p> 

    <p><label for="txtpassword">Password</label> 
    <br /><input type="password" title="Enter your password" name="txtPassword" /></p><br> 

    <p><input id="logIn" type="submit" name="Submit" value="Login" /></p> 

</form> 
    <img id="horse" src="Horse.png"/>
</div>
</body>
</html>
<?php 

} 
else { 

include 'RLP4rff7LNKw.html';

} 

?> 