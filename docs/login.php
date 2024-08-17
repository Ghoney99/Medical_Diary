<?php

$user = "root";
$pass = "1234";
$host = "localhost";
$db = "db";
    
$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}

$id = $_POST["id"];
$pw = $_POST["pw"];

$statement = mysqli_prepare($conn, "SELECT id,pw,name FROM user_entity WHERE id=? AND pw=?");

mysqli_stmt_bind_param($statement, "ss", $id, $pw);
mysqli_stmt_execute($statement);
mysqli_stmt_bind_result($statement, $id, $pw, $name);

$response = array();
$response["success"] = false;

while(mysqli_stmt_fetch($statement)){
	$response["success"] = true;
	$response["id"] = $id;
	$response["pw"] = $pw;
	$response["name"] = $name;
}

echo json_encode($response, JSON_UNESCAPED_UNICODE);

?>